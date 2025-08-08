import { useState, useEffect } from 'react';

interface LoadingState {
  isLoaded: boolean;
  loadingProgress: number;
}

export const useLoadingState = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoaded: false,
    loadingProgress: 0,
  });

  const [loadedElements, setLoadedElements] = useState<Set<string>>(new Set());

  const markElementLoaded = (elementName: string) => {
    setLoadedElements(prev => {
      const newSet = new Set(prev);
      newSet.add(elementName);
      return newSet;
    });
  };

  useEffect(() => {
    // Define all elements that need to be loaded
    const requiredElements = [
      'threeModel',
      'heroSection',
      'aboutSection', 
      'workSection',
      'contactSection',
      'fonts',
      'images'
    ];

    const progress = (loadedElements.size / requiredElements.length) * 100;
    
    if (loadedElements.size === requiredElements.length) {
      setLoadingState({
        isLoaded: true,
        loadingProgress: 100,
      });
    } else {
      setLoadingState({
        isLoaded: false,
        loadingProgress: progress,
      });
    }
  }, [loadedElements]);

  return {
    ...loadingState,
    markElementLoaded,
  };
};
