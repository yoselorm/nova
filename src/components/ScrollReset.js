import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollReset = ({ children }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // Give the target page a moment to render before scrolling to its anchor
    const timer = setTimeout(() => {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo(0, 0);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return children || null;
};

export default ScrollReset;
