// components/ConfettiBackground.tsx
import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const ConfettiBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      // Initialize confetti with the canvas element
      const createConfetti = () => {
        confetti({
          
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      };

      // Create confetti every 2 seconds
      const interval = setInterval(createConfetti, 2000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none", // Ensure it doesn't interfere with other elements
      }}
    ></canvas>
  );
};

export default ConfettiBackground;
