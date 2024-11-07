import React from 'react';

const WaveAnimation = () => {
  return (
    <>
      <style jsx>{`
        .wave-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
        }

        .wave {
          width: 8px;
          height: 30px;
          background-color: #000; /* Customize the color */
          border-radius: 5px;
          animation: wave 1s infinite ease-in-out;
        }

        .wave:nth-child(1) { animation-delay: 0s; }
        .wave:nth-child(2) { animation-delay: 0.1s; }
        .wave:nth-child(3) { animation-delay: 0.2s; }
        .wave:nth-child(4) { animation-delay: 0.3s; }
        .wave:nth-child(5) { animation-delay: 0.4s; }

        @keyframes wave {
          0%, 40%, 100% {
            transform: scaleY(0.4);
          }
          20% {
            transform: scaleY(1);
          }
        }
      `}</style>

      <div className="wave-container">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </>
  );
};

export default WaveAnimation;
