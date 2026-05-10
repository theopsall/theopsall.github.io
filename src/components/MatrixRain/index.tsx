import React from 'react';
import './index.css';
import { useMatrixRain } from '@/components/MatrixRain/hooks/useMatrixRain';

interface MatrixRainProps {
  className?: string;
  fontSize?: number;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ className, fontSize = 16 }) => {
  const canvasRef = useMatrixRain(fontSize);

  return (
    <canvas
      ref={canvasRef}
      className={`matrix-rain-canvas${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    />
  );
};

export default MatrixRain;
