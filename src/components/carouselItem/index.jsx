import { calculateItemTransform } from "../../utils/calculateResponsiveValues";

const CarouselItem = ({
  item,
  globalIndex,
  dataIndex,
  x,
  centerX,
  isDragging,
  config,
}) => {
  const { ITEM_WIDTH, IMAGE_WIDTH, IMAGE_HEIGHT } = config;

  const distanceFromCenter = Math.abs(x - centerX);
  const relativeX = x - centerX;

  const { scale, opacity, rotationDegrees, verticalOffset } =
    calculateItemTransform(relativeX, distanceFromCenter, config);

  return (
    <div
      key={`${globalIndex}-${dataIndex}`}
      className="absolute"
      style={{
        left: x - ITEM_WIDTH / 2,
        top: 0,
        transform: `translateY(${verticalOffset}px) scale(${scale}) rotateZ(${rotationDegrees}deg)`,
        opacity,
        transformOrigin: "center center",
        transition: isDragging
          ? "none"
          : "transform 0.2s ease-out, opacity 0.2s ease-out",
        willChange: isDragging ? "transform" : "auto",
      }}
    >
      <div
        className="overflow-hidden mb-4"
        style={{
          width: `${IMAGE_WIDTH}px`,
          height: `${IMAGE_HEIGHT}px`,
        }}
      >
        <img
          src={item.image}
          alt={`Image ${dataIndex + 1}`}
          className="object-cover w-full h-full"
          draggable={false}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default CarouselItem;
