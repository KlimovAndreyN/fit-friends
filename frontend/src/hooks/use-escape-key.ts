import { useEffect } from 'react';

import { isEventEscKey } from '../utils/common';

function useEscapeKey(onEscKeyPress: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {

      if (isEventEscKey(event)) {
        onEscKeyPress();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEscKeyPress]);
}

export default useEscapeKey;
