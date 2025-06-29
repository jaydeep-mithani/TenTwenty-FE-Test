import { useEffect, useRef, useState } from "react";
import { heroSectionSlides } from "../../constants/data";
import { AnimatedHeroSlides, AnimatedNumber } from "../../components";
import { HERO_SLIDE_DURATION } from "../../config/settings";

const HeroSection = () => {
  const svgRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [textAnimationKey, setTextAnimationKey] = useState(0);

  // Function to go to next slide
  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % heroSectionSlides.length);
    // Trigger text animation restart
    setTextAnimationKey((prev) => prev + 1);
  };

  // Function to start/restart the progress animation
  const startProgressAnimation = () => {
    setAnimationKey((prev) => prev + 1);
  };

  // Function to reset interval
  const resetInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    // Start the progress animation
    startProgressAnimation();

    const newIntervalId = setInterval(() => {
      goToNextSlide();
      // Restart the animation for the next cycle
      startProgressAnimation();
    }, HERO_SLIDE_DURATION * 1000);

    setIntervalId(newIntervalId);
  };

  // Initialize interval on mount and trigger initial text animation
  useEffect(() => {
    resetInterval();
    setTextAnimationKey(1); // Start text animation on mount

    // Cleanup on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  // Set CSS custom property for animation duration
  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.style.setProperty(
        "--hero-slide-duration",
        `${HERO_SLIDE_DURATION}s`
      );
    }
  }, []);

  // Handle next button click
  const handleNextClick = () => {
    goToNextSlide();
    resetInterval(); // Reset the interval timer and restart animation
  };

  // Calculate next slide index for preview
  const nextSlideIndex = (currentSlideIndex + 1) % heroSectionSlides.length;

  return (
    <section className="hero-section relative h-[900px] overflow-hidden flex items-center justify-start">
      <AnimatedHeroSlides
        currentIndex={currentSlideIndex}
        slides={heroSectionSlides}
      />
      <article className="z-20 ml-[25px] md:ml-[135px]">
        <h6
          key={`title-${textAnimationKey}`}
          className="mb-[15px] md:mb-6 text-sm md:text-base leading-[130%] md:leading-[150%] text-[#F9F4EE] md:text-[#EEF4F9] animate-slide-in-left"
        >
          {heroSectionSlides[currentSlideIndex].title}
        </h6>
        <h1
          key={`subtitle-${textAnimationKey}`}
          className="text-[46px] md:text-[64px] leading-[100%] capitalize text-[#EEF4F9] mr-[48px] max-w-[550px] animate-fade-in-bottom"
        >
          {heroSectionSlides[currentSlideIndex].subtitle}
        </h1>
      </article>

      {/* Next image indicator */}
      <div className="absolute bottom-[65px] md:bottom-[67px] left-[25px] md:left-[135px] flex items-center justify-start gap-[33px]">
        <div className="relative pl-[22px] pt-[22px] pr-[23px] pb-[23px] border border-[#eef4f94d]">
          {/* SVG Progress Border */}
          <svg
            key={animationKey}
            ref={svgRef}
            className="absolute pointer-events-none"
            style={{
              "--hero-slide-duration": `${HERO_SLIDE_DURATION}s`,
              top: "-4px",
              left: "-4px",
              width: "147px",
              height: "147px",
            }}
            viewBox="0 0 147 147"
            width="147"
            height="147"
          >
            <path
              className="progress-path animate-progress"
              d="M 4 4 L 143 4 L 143 143 L 4 143 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="8"
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeDasharray="556"
              strokeDashoffset="556"
              style={{
                animationDuration: `${
                  HERO_SLIDE_DURATION + HERO_SLIDE_DURATION * 0.17
                }s`,
              }}
            />
          </svg>

          <div className="w-[93px] h-[93px] overflow-hidden relative">
            <AnimatedHeroSlides
              currentIndex={nextSlideIndex}
              slides={heroSectionSlides}
            />
            <button
              type="button"
              onClick={handleNextClick}
              className="absolute top-0 left-0 w-full h-full bg-black/25 flex items-center justify-center text-white hover:bg-black/40 transition-colors duration-200"
            >
              Next
            </button>
          </div>
        </div>
        <div className="flex items-center gap-[17px]">
          <AnimatedNumber
            number={(currentSlideIndex + 1).toString().padStart(2, "0")}
          />
          <span className="block h-[1px] w-[103px] bg-white" />
          <span className="text-white">
            {heroSectionSlides.length.toString().padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
