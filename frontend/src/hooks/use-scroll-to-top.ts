import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//! понадобился?
function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(
    () => {
      window.scrollTo(0, 0);
    },
    [pathname]
  );

  return null;
}

export default useScrollToTop;
