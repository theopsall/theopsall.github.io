import { useEffect, useRef } from 'react';

const KATAKANA = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMS = '0123456789';
const ALPHABET = KATAKANA + LATIN + NUMS;

export const useMatrixRain = (fontSize: number) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let intervalId: ReturnType<typeof setInterval>;
    let rainDrops: number[] = [];

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / fontSize);
      rainDrops = Array.from({ length: cols }, () =>
        Math.random() > 0.5
          ? Math.floor(Math.random() * (canvas.height / fontSize))
          : 0
      );
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < rainDrops.length; i++) {
        const char = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        ctx.fillText(char, i * fontSize, rainDrops[i] * fontSize);
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const start = () => {
      setup();
      clearInterval(intervalId);
      intervalId = setInterval(draw, 30);
    };

    start();
    window.addEventListener('resize', start);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', start);
    };
  }, [fontSize]);

  return canvasRef;
};
