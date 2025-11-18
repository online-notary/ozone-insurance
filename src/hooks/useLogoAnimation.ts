import { useState, useEffect } from "react";

type AnimationState = 'initial' | 'playing' | 'completed';

export const useLogoAnimation = () => {
  const [animationState, setAnimationState] = useState<AnimationState>('initial');
  const [hasSeenAnimation, setHasSeenAnimation] = useState(false);

  useEffect(() => {
    // Check if user has already seen the animation in this session
    const seenAnimation = sessionStorage.getItem('logo-animation-seen');
    if (seenAnimation === 'true') {
      setHasSeenAnimation(true);
      setAnimationState('completed');
    } else {
      setAnimationState('playing');
    }
  }, []);

  const completeAnimation = () => {
    setAnimationState('completed');
    setHasSeenAnimation(true);
    sessionStorage.setItem('logo-animation-seen', 'true');
  };

  const resetAnimation = () => {
    setAnimationState('playing');
    sessionStorage.removeItem('logo-animation-seen');
  };

  return {
    animationState,
    hasSeenAnimation,
    completeAnimation,
    resetAnimation,
    shouldShowAnimation: animationState === 'playing',
    isAnimationComplete: animationState === 'completed'
  };
};