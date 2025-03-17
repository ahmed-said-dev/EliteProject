import { useEffect } from 'react';

export function useRTL() {
  useEffect(() => {
    // Ensure RTL direction is set on the HTML element
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';

    return () => {
      // Cleanup if needed
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    };
  }, []);
}
