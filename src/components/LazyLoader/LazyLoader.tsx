import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/css';

interface LazyLoadImageProps {
  src: string;
  alt: string;
  placeholder: React.ReactNode;
}

const LazyLoadImage: React.FC<LazyLoadImageProps> = ({ src, alt, placeholder }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(imageRef.current!);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div
      className={css`
        position: relative;
        width: 300px;
        height: 200px;
        overflow: hidden;
      `}
    >
      {!isVisible && (
        <div
          className={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          `}
        >
          {placeholder}
        </div>
      )}
      <img
        ref={imageRef}
        className={css`
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: ${isVisible ? 'block' : 'none'};
        `}
        src={isVisible ? src : ''}
        alt={alt}
      />
    </div>
  );
};

export default LazyLoadImage;