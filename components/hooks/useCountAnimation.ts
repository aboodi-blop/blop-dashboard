import { useEffect, useState, useRef } from 'react';

// Global state to track if animations have run
const animationCache = new Map<string, boolean>();

export function useCountAnimation(
  endValue: number, 
  duration: number = 2000,
  startDelay: number = 0,
  uniqueKey?: string
) {
  const [count, setCount] = useState(0);
  const hasStartedRef = useRef(false);
  
  // Create a unique key for this animation if not provided
  const cacheKey = uniqueKey || `${endValue}-${duration}-${startDelay}`;

  useEffect(() => {
    // Check if this animation has already run in this session
    if (animationCache.get(cacheKey) || hasStartedRef.current) {
      setCount(endValue);
      return;
    }
    
    const timer = setTimeout(() => {
      hasStartedRef.current = true;
      animationCache.set(cacheKey, true);
      
      let startTime: number;
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * endValue);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(endValue);
        }
      };
      
      requestAnimationFrame(animate);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [endValue, duration, startDelay, cacheKey]);

  return count;
}

// Function to reset all animations (useful for development or if needed)
export function resetAnimationCache() {
  animationCache.clear();
}