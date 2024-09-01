// components/BookClubParticles.tsx
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const BookClubParticles: React.FC = () => {
  const particlesInit = async (engine: any) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: '#f0f4f8',
          },
        },
        particles: {
          number: {
            value: 30,
          },
          shape: {
            type: 'image',
            image: [
              {
                src: '/images/book-icon.png',
                width: 30,
                height: 30,
              },
              {
                src: '/images/coffee-icon.png',
                width: 30,
                height: 30,
              },
              {
                src: '/images/glasses-icon.png',
                width: 30,
                height: 30,
              },
            ],
          },
          size: {
            value: 20,
            random: true,
          },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            outModes: {
              default: 'bounce',
            },
          },
          opacity: {
            value: 0.5,
            random: true,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            onClick: {
              enable: true,
              mode: 'push',
            },
          },
        },
      }}
    />
  );
};

export default BookClubParticles;
