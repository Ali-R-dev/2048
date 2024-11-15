// Animation durations in seconds
export const ANIMATION_DURATION = 0.15; // 150ms

// Spring animation configurations
export const MOVEMENT_SPRING = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  duration: ANIMATION_DURATION
};

export const MERGE_SPRING = {
  type: "spring" as const,
  stiffness: 200,
  damping: 20,
  duration: ANIMATION_DURATION
};

export const NEW_TILE_SPRING = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
  duration: ANIMATION_DURATION
};
