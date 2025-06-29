import { useMemo } from "react";
import { calculateVisibleRange } from "../../utils/calculateResponsiveValues";
import CarouselItem from "../carouselItem";

const CarouselContainer = ({
  containerRef,
  offset,
  containerWidth,
  isDragging,
  responsiveValues,
  carouselData,
  handleMouseDown,
}) => {
  const { ITEM_SPACING, ITEM_WIDTH, CONTAINER_HEIGHT } = responsiveValues;

  const visibleItems = useMemo(() => {
    const centerX = containerWidth / 2;
    const items = [];

    const itemsToRender = calculateVisibleRange(
      containerWidth,
      ITEM_WIDTH,
      ITEM_SPACING,
      carouselData.length
    );

    const startIndex =
      Math.floor(-offset / ITEM_SPACING) - Math.ceil(itemsToRender / 2);

    for (let i = 0; i < itemsToRender; i++) {
      const globalIndex = startIndex + i;
      const dataIndex =
        ((globalIndex % carouselData.length) + carouselData.length) %
        carouselData.length;
      const x = globalIndex * ITEM_SPACING + offset + centerX;

      // Skip if not visible
      if (x < -ITEM_WIDTH || x > containerWidth + ITEM_WIDTH) continue;

      items.push(
        <CarouselItem
          key={`${globalIndex}-${dataIndex}`}
          item={carouselData[dataIndex]}
          globalIndex={globalIndex}
          dataIndex={dataIndex}
          x={x}
          centerX={centerX}
          isDragging={isDragging}
          config={responsiveValues}
        />
      );
    }

    return items;
  }, [
    offset,
    containerWidth,
    isDragging,
    ITEM_SPACING,
    ITEM_WIDTH,
    responsiveValues,
    carouselData,
  ]);

  return (
    <div
      className="w-full relative overflow-hidden mb-12 md:mb-14"
      style={{ height: `${CONTAINER_HEIGHT}px` }}
    >
      <div
        ref={containerRef}
        className="relative h-full cursor-default active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        style={{ touchAction: "pan-y" }}
      >
        {visibleItems}
      </div>
    </div>
  );
};

export default CarouselContainer;
