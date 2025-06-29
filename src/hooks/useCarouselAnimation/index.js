import { useRef, useCallback } from "react";
import { CAROUSEL_CONFIG } from "../../config/settings";

export const useCarouselAnimation = (setOffset, centerOffset, itemSpacing) => {
  const animationRef = useRef(null);
  const dragStateRef = useRef({
    startX: 0,
    startOffset: 0,
    velocity: 0,
    lastTime: 0,
    lastX: 0,
  });

  const startMomentum = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const animate = () => {
      const dragState = dragStateRef.current;

      // Apply friction
      dragState.velocity *= CAROUSEL_CONFIG.friction;

      if (Math.abs(dragState.velocity) > CAROUSEL_CONFIG.minVelocity) {
        setOffset((prev) => {
          const newOffset = prev + dragState.velocity;

          // Magnetic centering when velocity is low
          if (
            Math.abs(dragState.velocity) < CAROUSEL_CONFIG.centeringThreshold
          ) {
            const nearestIndex = Math.round(
              -(newOffset - centerOffset) / itemSpacing
            );
            const targetOffset = -nearestIndex * itemSpacing + centerOffset;
            const distance = targetOffset - newOffset;

            // Magnetic force for centering
            if (Math.abs(distance) > CAROUSEL_CONFIG.snapDistance) {
              const centeringForce = distance * CAROUSEL_CONFIG.magneticForce;
              return newOffset + centeringForce;
            } else {
              // Snap to center when very close
              dragState.velocity = 0;
              return targetOffset;
            }
          }

          return newOffset;
        });

        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (Math.abs(dragStateRef.current.velocity) > CAROUSEL_CONFIG.minVelocity) {
      animate();
    }
  }, [setOffset, centerOffset, itemSpacing]);

  const cancelAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  return {
    dragStateRef,
    startMomentum,
    cancelAnimation,
  };
};
