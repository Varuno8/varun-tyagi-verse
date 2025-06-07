import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY as string | undefined;

const buildPrompt = (hour: number, weather: string) => {
  let timeDesc = 'mysterious night sky';
  if (hour >= 5 && hour < 12) timeDesc = 'a serene sunrise';
  else if (hour >= 12 && hour < 17) timeDesc = 'a bright afternoon sky';
  else if (hour >= 17 && hour < 20) timeDesc = 'a dreamlike twilight sky';
  return `${timeDesc} with ${weather.toLowerCase()} weather, cinematic — style of Studio Ghibli`;
};

const LivingBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 1;
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.8 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    meshRef.current = mesh;
    rendererRef.current = renderer;
    cameraRef.current = camera;
    sceneRef.current = scene;

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.color.setHSL((0.6 + Math.sin(t * 0.05) * 0.05) % 1, 1, 0.5);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    const handleMove = (e: MouseEvent) => {
      const offsetX = (e.clientX / window.innerWidth - 0.5) * 0.1;
      const offsetY = (e.clientY / window.innerHeight - 0.5) * 0.1;
      camera.position.x = offsetX;
      camera.position.y = -offsetY;
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMove);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (!imageUrl || !meshRef.current) return;
    const loader = new THREE.TextureLoader();
    loader.load(imageUrl, texture => {
      const mat = meshRef.current!.material as THREE.MeshBasicMaterial;
      mat.map = texture;
      mat.needsUpdate = true;
    });
  }, [imageUrl]);

  useEffect(() => {
    if (!OPENWEATHER_KEY) {
      console.warn('VITE_OPENWEATHER_KEY is not set. Weather background disabled.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const hour = new Date().getHours();
        let weatherMain = 'Clear';
        try {
          if ('geolocation' in navigator) {
            const pos = await new Promise<GeolocationPosition>((res, rej) =>
              navigator.geolocation.getCurrentPosition(res, rej)
            );
            const resp = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${OPENWEATHER_KEY}`
            );
            const data = await resp.json();
            weatherMain = data.weather[0].main;
          } else {
            throw new Error('no geolocation');
          }
        } catch {
          const city = 'London';
          const resp = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_KEY}`
          );
          const data = await resp.json();
          weatherMain = data.weather[0].main;
        }

        const moodPrompt = buildPrompt(hour, weatherMain);
        const imgRes = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: moodPrompt })
        });
        const { imageUrl: url } = await imgRes.json();
        if (url) setImageUrl(url);
      } catch (e) {
        console.error('image generation error', e);
      } finally {
        setLoading(false);
      }
    };

    let interval: ReturnType<typeof setInterval>;
    const start = () => {
      fetchData();
      interval = setInterval(fetchData, 60 * 60 * 1000);
    };

    window.addEventListener('pointerdown', start, { once: true });
    return () => {
      window.removeEventListener('pointerdown', start);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10">
      {!imageUrl && <div className="bg-fallback absolute inset-0" />}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-neon-purple border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default LivingBackground;
