import { useState, useCallback, useEffect } from "react";

export const useCarouselDrag = (
  offset,
  setOffset,
  dragStateRef,
  startMomentum,
  cancelAnimation
) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(
    (e) => {
      cancelAnimation();
      setIsDragging(true);

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const currentTime = performance.now();

      dragStateRef.current = {
        startX: clientX,
        startOffset: offset,
        velocity: 0,
        lastTime: currentTime,
        lastX: clientX,
      };
    },
    [offset, cancelAnimation, dragStateRef]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const currentTime = performance.now();
      const deltaTime = Math.max(
        currentTime - dragStateRef.current.lastTime,
        16
      );
      const deltaX = clientX - dragStateRef.current.startX;

      const velocityDeltaX = clientX - dragStateRef.current.lastX;
      dragStateRef.current.velocity = (velocityDeltaX / deltaTime) * 16;
      dragStateRef.current.lastTime = currentTime;
      dragStateRef.current.lastX = clientX;

      const newOffset = dragStateRef.current.startOffset + deltaX;
      setOffset(newOffset);
    },
    [isDragging, dragStateRef, setOffset]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    startMomentum();
  }, [startMomentum]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      handleMouseMove(e);
    };

    const options = { passive: false };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleMove, options);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    isDragging,
    handleMouseDown,
  };
};
