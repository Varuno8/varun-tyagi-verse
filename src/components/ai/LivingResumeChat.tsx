import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const LivingResumeChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Hi! Ask me anything about Varun's work." }
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [sessionId] = useState(() => {
    if (typeof window === 'undefined') return 'default';
    const saved = localStorage.getItem('lr-session');
    if (saved) return saved;
    const id = Math.random().toString(36).slice(2);
    localStorage.setItem('lr-session', id);
    return id;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognitionClass) {
      setSpeechSupported(true);
      recognitionRef.current = new SpeechRecognitionClass();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.continuous = false;
      recognitionRef.current.onresult = (e: SpeechRecognitionEvent) => {
        const text = e.results[0][0].transcript;
        setIsListening(false);
        sendMessage(text);
      };
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onerror = () => setIsListening(false);
    }
  }, []);

  const togglePause = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!utterance) return;
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPaused(false);
      setUtterance(null);
    }
  };

  const startListening = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (err) {
      console.error('Speech recognition start error', err);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const sendMessage = async (override?: string) => {
    const trimmed = (override ?? input).trim();
    if (!trimmed) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPaused(false);
    }
    const userMsg = { sender: 'user', text: trimmed } as Message;
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsSending(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, sessionId, history: messages }),
      });
      const data = await res.json();
      const reply = data.reply || 'Sorry, I had trouble answering that.';
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const utt = new SpeechSynthesisUtterance(reply);
        utt.onend = () => {
          setIsPaused(false);
          setUtterance(null);
        };
        setUtterance(utt);
        window.speechSynthesis.speak(utt);
      }
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'Oops! Something went wrong.' },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto my-12">
      <CardHeader>
        <CardTitle>Living Resume</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 overflow-y-auto space-y-3 mb-4">
          {messages.map((m, idx) => (
            <div key={idx} className={m.sender === 'user' ? 'text-right' : 'text-left'}>
              <span
                className={`inline-block px-3 py-2 rounded-lg ${
                  m.sender === 'user' ? 'bg-neon-cyan/20' : 'bg-white/10'
                }`}
              >
                {m.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Ask about projects, skills, experience..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          {speechSupported ? (
            <Button
              type="button"
              variant="secondary"
              onClick={isListening ? stopListening : startListening}
            >
              {isListening ? 'Listening...' : '🎤'}
            </Button>
          ) : (
            <Button type="button" variant="secondary" disabled>
              🎤
            </Button>
          )}
          <Button onClick={sendMessage} disabled={isSending}>
            {isSending ? '...' : 'Send'}
          </Button>
          <Button type="button" onClick={togglePause} disabled={!utterance} variant="secondary">
            {isPaused ? 'Resume Voice' : 'Pause Voice'}
          </Button>
          <Button type="button" onClick={stopSpeech} disabled={!utterance} variant="secondary">
            Stop
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LivingResumeChat;
