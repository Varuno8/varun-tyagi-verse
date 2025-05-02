
// Color constants for consistent styling
export const colors = {
  cyan: "#00FFFF",   // Electric blue (primary)
  teal: "#00B5C5",   // Teal accent
  purple: "#A259FF", // Neon purple accent
  darkBlue: "#070b11" // Dark space background
};

// Define common positions for reuse across scene components
export const cubePositions: [number, number, number][] = [
  [-5, 1, -3],
  [5, -1.5, 2],
  [-2.5, -2, -4],
  [3.5, 2.5, -2],
  [-4, 0.5, 3]
];

export const spherePositions: [number, number, number][] = [
  [-7, 3, 5],
  [6, 4, -1]
];

// Network particle config
export const networkConfig = {
  particleCount: 90,          // Increased for more density
  particleSizeRange: [0.05, 0.2], // Larger size range for better hierarchy
  connectionDistance: 8,      // Maximum distance for particle connections
  connectionOpacity: 0.6,     // Stronger connections
  movementSpeed: 0.08,        // Slightly faster movement
  pulseFrequency: 3,          // Seconds per pulse
  colorDistribution: {        // Color distribution percentages
    cyan: 0.5,
    teal: 0.3,
    purple: 0.2
  },
  // Z-depth layers for parallax effect
  depthLayers: {
    foreground: [-10, 0],     // Closer to camera
    midground: [-25, -10],    // Middle distance
    background: [-40, -25]    // Far distance
  }
};
