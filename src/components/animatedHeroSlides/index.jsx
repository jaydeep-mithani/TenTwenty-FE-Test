import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { HERO_SLIDE_TRANSITION_DURATION } from "../../config/settings";

const AnimatedHeroSlides = ({ currentIndex = 0, slides = null }) => {
  const [currentSlide, setCurrentSlide] = useState(currentIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextSlide, setNextSlide] = useState(
    (currentIndex + 1) % slides?.length
  );
  const [showSplit, setShowSplit] = useState(true);

  // Update slides when currentIndex prop changes
  useEffect(() => {
    if (currentIndex !== currentSlide) {
      const next = currentIndex;
      setNextSlide(next);
      setIsAnimating(true);

      // After split animation completes, hide split and show new image
      setTimeout(() => {
        setShowSplit(false);
        setCurrentSlide(next);

        // Reset for next cycle
        setTimeout(() => {
          setShowSplit(true);
          setIsAnimating(false);
        }, 50);
      }, HERO_SLIDE_TRANSITION_DURATION * 1000);
    }
  }, [currentIndex, currentSlide]);

  return (
    slides && (
      <Fragment>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-opacity duration-300"
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
          }}
        />
        {/* Next Image (behind with zoom effect) */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out ${
            isAnimating ? "scale-105 opacity-100" : "scale-100 opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slides[nextSlide].image})`,
          }}
        />
        {/* Animated Split Overlay - only show when not animating to next */}
        {showSplit && (
          <div className="absolute inset-0">
            {/* Top Half */}
            <div
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-in-out scale-105 ${
                isAnimating ? "-translate-y-full" : "translate-y-0"
              }`}
              style={{
                backgroundImage: `url(${slides[currentSlide].image})`,
                clipPath: "inset(0 0 50% 0)", // Show only top half
              }}
            />

            {/* Bottom Half */}
            <div
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-in-out scale-105 ${
                isAnimating ? "translate-y-full" : "translate-y-0"
              }`}
              style={{
                backgroundImage: `url(${slides[currentSlide].image})`,
                clipPath: "inset(50% 0 0 0)", // Show only bottom half
              }}
            />
          </div>
        )}
      </Fragment>
    )
  );
};

export default AnimatedHeroSlides;
