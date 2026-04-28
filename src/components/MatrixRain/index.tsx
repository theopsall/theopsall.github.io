import React, { useRef, useEffect } from 'react';
import './index.css';

// Character set from the guide: full katakana + latin + digits
const KATAKANA = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const LATIN   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMS    = '0123456789';
const ALPHABET = KATAKANA + LATIN + NUMS;

interface MatrixRainProps {
  className?: string;
  fontSize?: number;
}

const MatrixRain: React.FC<MatrixRainProps> = ({
  className,
  fontSize = 16,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let intervalId: ReturnType<typeof setInterval>;
    let rainDrops: number[] = [];

    const setup = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width  = parent.clientWidth;
      canvas.height = parent.clientHeight;

      const cols = Math.floor(canvas.width / fontSize);

      // Stagger start positions: half already somewhere in viewport, half above
      rainDrops = Array.from({ length: cols }, () =>
        Math.random() > 0.5
          ? Math.floor(Math.random() * (canvas.height / fontSize))
          : 0
      );

      // Fill with background color first
      ctx.fillStyle = '#050607';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const draw = () => {
      // Semi-transparent overlay creates the fading trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const char = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        ctx.fillText(char, i * fontSize, rainDrops[i] * fontSize);

        // Probabilistic reset once a column passes the bottom
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

  return (
    <canvas
      ref={canvasRef}
      className={`matrix-rain-canvas${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    />
  );
};

export default MatrixRain;
