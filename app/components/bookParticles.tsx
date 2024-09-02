import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './styles.css';

const BookAnimation: React.FC = () => {
  const bookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const book = bookRef.current;

    if (book) {
      const timeline = gsap.timeline({ repeat: -1, yoyo: true });

      // Rotate the whole book for a more realistic effect
      timeline.fromTo(
        book,
        { rotateY: 0 },
        { rotateY: -360, duration: 4, ease: 'power2.inOut' }
      );

      // Animate individual pages to flip
      const pages = gsap.utils.toArray('.book-page') as HTMLElement[];
      pages.forEach((page, index) => {
        timeline.fromTo(
          page,
          { rotateY: 0 },
          { rotateY: -180, duration: 1, ease: 'power2.inOut', delay: index * 0.5 }
        );
      });
    }
  }, []);

  const coverImage = "https://imgs.search.brave.com/TkbdRzQvP_8SyF5UO6dmYESrtu6irUdbZtbXEtoTGmk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YWRhemluZy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjIv/MTIvSGFycnktUG90/dGVyLUJvb2stQ292/ZXJzLVNvcmNlcmVy/cy1TdG9uZS11cy0z/LTY4M3gxMDI0Lmpw/Zw";
  const pageImage = "https://imgs.search.brave.com/MWY1czQucIbie2HOdk86eUKfou5U287tslUIfhRIIZA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2VkLzc4/LzA5L2VkNzgwOWZi/MWRjYzBkZGY5YWJh/M2U2MWZlMGZhYzJj/LmpwZw";

  return (
    <div className="book-container">
      <div className="book" ref={bookRef}>
        {[...Array(10)].map((_, index) => (
          <React.Fragment key={index}>
            <div className="book-cover">
              <img src={coverImage} alt={`Book Cover ${index + 1}`} />
            </div>
            <div className="book-page">
              <img src={pageImage} alt={`Book Page ${index + 1}`} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BookAnimation;
