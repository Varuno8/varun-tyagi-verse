import React, { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// Load the timeline events dynamically so the list can be updated
// without requiring a rebuild.
import { motion } from 'framer-motion';

interface RawEvent {
  year: string;
  prompt: string;
}

interface StoryEvent {
  year: string;
  story: string;
  audioUrl?: string;
  loading: boolean;
}

const voiceId = '21m00Tcm4TlvDq8ikWAM';

const Timeline: React.FC = () => {
  const [events, setEvents] = useState<StoryEvent[]>([]);
  const audioRefs = useRef<Array<HTMLAudioElement | null>>([]);
  const [playing, setPlaying] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      const module = await import('@/data/timeline.json');
      const raws = module.default as RawEvent[];
      for (const [index, ev] of raws.entries()) {
        setEvents(prev => [...prev, { year: ev.year, story: '', loading: true }]);
        let story = `In ${ev.year}, I ${ev.prompt}.`;
        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: `Write a first-person story in one or two sentences: \"In ${ev.year}, I ${ev.prompt}.\"` })
          });
          const data = await res.json();
          if (data.reply) story = data.reply;
        } catch (e) {
          console.error('chat error', e);
        }

        let audioUrl: string | undefined;
        try {
          const voiceRes = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: 'POST',
            headers: {
              'xi-api-key': import.meta.env.VITE_ELEVENLABS_API_KEY as string,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: story, voice_settings: { stability: 0.7, similarity_boost: 0.75 } })
          });
          const voiceData = await voiceRes.json();
          audioUrl = voiceData.audio_url;
        } catch (e) {
          console.error('voice error', e);
        }

        audioRefs.current[index] = audioUrl ? new Audio(audioUrl) : null;
        setEvents(prev => {
          const copy = [...prev];
          copy[index] = { year: ev.year, story, audioUrl, loading: false };
          return copy;
        });
      }
    };
    load();
    // pause audios on unmount
    return () => {
      audioRefs.current.forEach(a => a && a.pause());
    };
  }, []);

  const play = (i: number) => {
    const audio = audioRefs.current[i];
    if (!audio) return;
    audioRefs.current.forEach((a, idx) => {
      if (idx !== i && a) { a.pause(); a.currentTime = 0; }
    });
    audio.play();
    setPlaying(i);
  };

  const pause = (i: number) => {
    const audio = audioRefs.current[i];
    if (!audio) return;
    audio.pause();
    setPlaying(null);
  };

  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Navbar />
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-12 text-center">Watch Me Learn</h1>
        <div className="relative md:mx-20">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/30" />
          {events.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              onViewportEnter={() => play(i)}
              onViewportLeave={() => pause(i)}
              className={`mb-12 md:flex md:items-start md:relative ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <span className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-neon-purple rounded-full border-4 border-dark top-2" />
              <div className="md:w-1/2 px-4">
                <h3 className="text-lg font-semibold">{ev.year}</h3>
                <p className="mt-2 min-h-[3rem]">
                  {ev.loading ? <span className="inline-block animate-spin border-b-2 border-white rounded-full w-4 h-4" /> : ev.story}
                </p>
                {ev.audioUrl && !ev.loading && (
                  <button
                    className="mt-2 text-sm underline"
                    onClick={() => (playing === i ? pause(i) : play(i))}
                  >
                    {playing === i ? 'Pause' : 'Play'}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Timeline;
