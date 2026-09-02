import { useEffect, useRef, useState } from 'react';

// Lightweight scroll-reveal hook — a native IntersectionObserver replacement
// for framer-motion's whileInView. Fires once, then disconnects.
const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

export default useReveal;
