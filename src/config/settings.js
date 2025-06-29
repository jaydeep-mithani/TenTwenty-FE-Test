export const HERO_SLIDE_DURATION = 15; // 5 seconds for each slide

export const HERO_SLIDE_TRANSITION_DURATION = 1; // 1 seconds to complete the transition

export const CAROUSEL_CONFIG = {
  desktop: {
    ITEM_SPACING: 730,
    ITEM_WIDTH: 280,
    IMAGE_WIDTH: 434.9,
    IMAGE_HEIGHT: 619.21,
    CENTER_OFFSET: -80,
    CONTAINER_HEIGHT: 800,
    MAX_ROTATION: 25,
    MAX_VERTICAL_OFFSET: 100,
  },
  mobile: {
    ITEM_SPACING: 300,
    ITEM_WIDTH: 232.67,
    IMAGE_WIDTH: 232.67,
    IMAGE_HEIGHT: 331.27,
    CENTER_OFFSET: 0,
    CONTAINER_HEIGHT: 428,
    MAX_ROTATION: 15,
    MAX_VERTICAL_OFFSET: 40,
  },
  breakpoint: 768,
  friction: 0.95,
  magneticForce: 0.15,
  minVelocity: 0.1,
  centeringThreshold: 2,
  snapDistance: 1,
  resizeDebounce: 100,
};
