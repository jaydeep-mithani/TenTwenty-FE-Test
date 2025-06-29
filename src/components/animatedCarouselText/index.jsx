import { useState, useEffect, useRef } from "react";

const AnimatedCarouselText = ({ currentIndex, carouselData }) => {
  const [displayData, setDisplayData] = useState({
    title: carouselData[currentIndex].title,
    subtitle: carouselData[currentIndex].subtitle,
  });
  const [animationState, setAnimationState] = useState("idle"); // 'idle', 'out', 'in'
  const previousIndexRef = useRef(currentIndex);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (previousIndexRef.current !== currentIndex) {
      // Start fade-out animation
      setAnimationState("out");

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // After fade-out completes, update content and start fade-in
      timeoutRef.current = setTimeout(() => {
        setDisplayData({
          title: carouselData[currentIndex].title,
          subtitle: carouselData[currentIndex].subtitle,
        });

        setAnimationState("in");

        // Reset to idle state after fade-in completes
        setTimeout(() => {
          setAnimationState("idle");
        }, 300);
      }, 300);

      previousIndexRef.current = currentIndex;
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, carouselData]);

  const getAnimationClass = () => {
    switch (animationState) {
      case "out":
        return "animate-out";
      case "in":
        return "animate-in";
      default:
        return "";
    }
  };

  return (
    <div className="absolute bottom-28 md:bottom-56 left-1/2 -translate-x-1/2">
      <div className="text-transition-wrapper">
        <h3
          className={`mb-5 font-medium md:font-normal text-2xl md:text-4xl tracking-[-1px] text-center align-bottom carousel-text-keyframe ${getAnimationClass()}`}
        >
          {displayData.title}
        </h3>
      </div>

      <div className="text-transition-wrapper">
        <h5
          className={`font-medium md:font-normal leading-[22px] md:leading-[100%] text-center text-[#7A7777] carousel-text-keyframe ${getAnimationClass()}`}
        >
          {displayData.subtitle}
        </h5>
      </div>
    </div>
  );
};

export default AnimatedCarouselText;
