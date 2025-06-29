import { CAROUSEL_CONFIG } from "../config/settings";

export const calculateResponsiveValues = (windowWidth) => {
  const isMobile = windowWidth < 768;
  const config = isMobile ? CAROUSEL_CONFIG.mobile : CAROUSEL_CONFIG.desktop;

  return {
    ...config,
    isMobile,
  };
};

export const calculateItemTransform = (
  relativeX,
  distanceFromCenter,
  config
) => {
  const { ITEM_SPACING, MAX_ROTATION, MAX_VERTICAL_OFFSET } = config;

  // Scaling and opacity
  const adjacentThreshold = ITEM_SPACING * 1.2;
  const maxDistance = window.innerWidth / 2;

  const scale =
    distanceFromCenter <= adjacentThreshold
      ? 1
      : Math.max(
          0.7,
          1 - ((distanceFromCenter - adjacentThreshold) / maxDistance) * 0.3
        );

  const opacity =
    distanceFromCenter <= adjacentThreshold
      ? 1
      : Math.max(
          0.3,
          1 - ((distanceFromCenter - adjacentThreshold) / maxDistance) * 0.7
        );

  // Rotation
  const maxRotationDistance = ITEM_SPACING * 1.5;
  let rotationDegrees = 0;
  if (Math.abs(relativeX) > ITEM_SPACING / 4) {
    const rotationFactor = Math.min(
      Math.abs(relativeX) / maxRotationDistance,
      1
    );
    rotationDegrees = (relativeX > 0 ? 1 : -1) * rotationFactor * MAX_ROTATION;
  }

  // Vertical offset
  const verticalOffsetDistance = ITEM_SPACING * 1.0;
  const offsetFactor = Math.min(
    Math.abs(relativeX) / verticalOffsetDistance,
    1
  );
  const verticalOffset = Math.pow(offsetFactor, 1.2) * MAX_VERTICAL_OFFSET;

  return {
    scale,
    opacity,
    rotationDegrees,
    verticalOffset,
  };
};

export const calculateCurrentIndex = (
  offset,
  centerOffset,
  itemSpacing,
  dataLength
) => {
  const index = Math.round(-(offset - centerOffset) / itemSpacing);
  return ((index % dataLength) + dataLength) % dataLength;
};

export const calculateVisibleRange = (
  containerWidth,
  itemWidth,
  itemSpacing,
  dataLength
) => {
  const visibleRange = containerWidth + itemWidth;
  const itemsToRender = Math.ceil(visibleRange / itemSpacing) + dataLength;
  return itemsToRender;
};
