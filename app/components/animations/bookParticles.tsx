'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BackgroundAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      // Create floating shapes
      const shapes = gsap.utils.toArray('.shape') as HTMLElement[];

      shapes.forEach((shape) => {
        // Randomize initial position
        gsap.set(shape, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          scale: gsap.utils.random(0.5, 1.5),
        });

        // Animate floating motion
        gsap.to(shape, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          duration: gsap.utils.random(5, 10),
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });

        // Animate scale for a pulsing effect
        gsap.to(shape, {
          scale: gsap.utils.random(0.8, 1.2),
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      });

      // Animate the gradient background
      gsap.to(container, {
        backgroundPosition: '100% 50%',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'linear',
      });
    }
  }, []);

  return (
    <div
      className="background-container"
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1,
        background: 'linear-gradient(45deg, #ff9a9e, #fad0c4, #fbc2eb, #a6c1ee, #f6d365)',
        backgroundSize: '200% 200%',
      }}
    >
      <div
        className="shape shape-1"
        style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(20px)',
          opacity: 0.8,
        }}
      ></div>
      <div
        className="shape shape-2"
        style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(173, 216, 230, 0.1)',
          filter: 'blur(20px)',
          opacity: 0.8,
        }}
      ></div>
      <div
        className="shape shape-3"
        style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255, 182, 193, 0.1)',
          filter: 'blur(20px)',
          opacity: 0.8,
        }}
      ></div>
      <div
        className="shape shape-4"
        style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(144, 238, 144, 0.1)',
          filter: 'blur(20px)',
          opacity: 0.8,
        }}
      ></div>
      <div
        className="shape shape-5"
        style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(221, 160, 221, 0.1)',
          filter: 'blur(20px)',
          opacity: 0.8,
        }}
      ></div>
    </div>
  );
};

export default BackgroundAnimation;