import { useState, useEffect, useRef } from 'react';

const useIntersectionObserver = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (containerRef.current) {
      setTimeout(() => {
        observer.observe(containerRef.current);
      }, 700);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [options]);

  return [containerRef, isVisible];
};

export default useIntersectionObserver;
