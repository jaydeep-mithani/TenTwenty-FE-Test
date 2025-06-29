import { useState, useEffect, useMemo } from "react";
import { calculateResponsiveValues } from "../../utils/calculateResponsiveValues";
import { CAROUSEL_CONFIG } from "../../config/settings";

export const useCarouselResize = (containerRef) => {
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [containerWidth, setContainerWidth] = useState(1200);

  const responsiveValues = useMemo(
    () => calculateResponsiveValues(windowWidth),
    [windowWidth]
  );

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newWidth = window.innerWidth;
        setWindowWidth(newWidth);
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth);
        }
      }, CAROUSEL_CONFIG.resizeDebounce);
    };

    // Initial setup
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [containerRef]);

  return {
    windowWidth,
    containerWidth,
    responsiveValues,
  };
};
