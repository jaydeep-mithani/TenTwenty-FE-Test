import { useState, useRef, useEffect, useCallback } from "react";
import { carouselData } from "../../constants/data";
import {
  AnimatedCarouselText,
  CarouselContainer,
  CarouselCursor,
} from "../../components";
import {
  useCarouselAnimation,
  useCarouselDrag,
  useCarouselResize,
} from "../../hooks";
import { calculateCurrentIndex } from "../../utils/calculateResponsiveValues";

const CarouselSection = () => {
  const containerRef = useRef(null);
  const { containerWidth, responsiveValues } = useCarouselResize(containerRef);

  const { CENTER_OFFSET, ITEM_SPACING } = responsiveValues;
  const [offset, setOffset] = useState(CENTER_OFFSET);

  const { dragStateRef, startMomentum, cancelAnimation } = useCarouselAnimation(
    setOffset,
    CENTER_OFFSET,
    ITEM_SPACING
  );

  const { isDragging, handleMouseDown } = useCarouselDrag(
    offset,
    setOffset,
    dragStateRef,
    startMomentum,
    cancelAnimation
  );

  // Update offset when responsive values change
  useEffect(() => {
    const currentIndex = Math.round(-(offset - CENTER_OFFSET) / ITEM_SPACING);
    const newOffset = -currentIndex * ITEM_SPACING + CENTER_OFFSET;
    setOffset(newOffset);
  }, [CENTER_OFFSET, ITEM_SPACING]);

  // Get current center index
  const getCurrentIndex = useCallback(() => {
    return calculateCurrentIndex(
      offset,
      CENTER_OFFSET,
      ITEM_SPACING,
      carouselData.length
    );
  }, [offset, CENTER_OFFSET, ITEM_SPACING]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      cancelAnimation();
    };
  }, [cancelAnimation]);

  return (
    <div
      id="carousel-container"
      className="relative flex flex-col items-center justify-center pb-[107px] md:pb-[137px] bg-accent"
    >
      <CarouselCursor />

      <CarouselContainer
        containerRef={containerRef}
        offset={offset}
        containerWidth={containerWidth}
        isDragging={isDragging}
        responsiveValues={responsiveValues}
        carouselData={carouselData}
        handleMouseDown={handleMouseDown}
      />

      <AnimatedCarouselText
        carouselData={carouselData}
        currentIndex={getCurrentIndex()}
      />
    </div>
  );
};

export default CarouselSection;
