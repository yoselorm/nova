import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollReset = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Intercept navigation events and clear vertical scroll memory state
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
};

export default ScrollReset;