import confetti from 'canvas-confetti';

// Elegant luxury wedding palette: Royal gold, Champagne, Rose gold, Ivory, and Soft Blush
const WEDDING_CONFETTI_COLORS = [
  '#D4AF37', // Royal Gold
  '#F3E5AB', // Champagne
  '#D99898', // Rose Gold
  '#FAF7F2', // Soft Ivory
  '#E2C799', // Muted Gold
  '#E8B4B8', // Soft Peony Pink
];

/**
 * Multi-stage grand celebration confetti effect automatically triggered
 * once the user opens the envelope, creating a magical and festive reveal.
 */
export function fireEnvelopeRevealConfetti(): void {
  try {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // Optional custom shapes (flower petal & heart)
    let customShapes: confetti.Shape[] = ['circle', 'square', 'star'];
    try {
      if (typeof confetti.shapeFromPath === 'function') {
        // SVG heart path
        const heartShape = confetti.shapeFromPath({
          path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
        });
        customShapes = ['circle', 'star', heartShape];
      }
    } catch {
      // Fallback to standard shapes if SVG path not supported
      customShapes = ['circle', 'square', 'star'];
    }

    // --- Stage 1: Immediate Center Burst from Wax Seal ---
    confetti({
      particleCount: isMobile ? 45 : 75,
      spread: 80,
      startVelocity: isMobile ? 35 : 45,
      origin: { x: 0.5, y: 0.52 },
      colors: WEDDING_CONFETTI_COLORS,
      shapes: customShapes,
      scalar: 1.1,
      ticks: 240,
      zIndex: 9999,
      disableForReducedMotion: true,
    });

    // --- Stage 2: Dual Cannons (Left & Right celebration fireworks) ---
    const startTime = Date.now();
    const duration = 2400; // 2.4 seconds of continuous festive showers

    const cannonInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed > duration) {
        clearInterval(cannonInterval);
        return;
      }

      // Left cannon
      confetti({
        particleCount: isMobile ? 3 : 5,
        angle: 60,
        spread: 65,
        startVelocity: isMobile ? 42 : 55,
        origin: { x: 0.02, y: 0.88 },
        colors: WEDDING_CONFETTI_COLORS,
        shapes: customShapes,
        scalar: 0.95,
        ticks: 280,
        zIndex: 9999,
        disableForReducedMotion: true,
      });

      // Right cannon
      confetti({
        particleCount: isMobile ? 3 : 5,
        angle: 120,
        spread: 65,
        startVelocity: isMobile ? 42 : 55,
        origin: { x: 0.98, y: 0.88 },
        colors: WEDDING_CONFETTI_COLORS,
        shapes: customShapes,
        scalar: 0.95,
        ticks: 280,
        zIndex: 9999,
        disableForReducedMotion: true,
      });
    }, 120);

    // --- Stage 3: Gentle Heavenly Sky Shower ---
    setTimeout(() => {
      confetti({
        particleCount: isMobile ? 25 : 40,
        origin: { x: 0.35, y: 0.05 },
        angle: 270,
        spread: 90,
        startVelocity: 15,
        gravity: 0.65,
        drift: 0.2,
        colors: WEDDING_CONFETTI_COLORS,
        shapes: customShapes,
        scalar: 1.0,
        ticks: 300,
        zIndex: 9999,
        disableForReducedMotion: true,
      });

      confetti({
        particleCount: isMobile ? 25 : 40,
        origin: { x: 0.65, y: 0.05 },
        angle: 270,
        spread: 90,
        startVelocity: 15,
        gravity: 0.65,
        drift: -0.2,
        colors: WEDDING_CONFETTI_COLORS,
        shapes: customShapes,
        scalar: 1.0,
        ticks: 300,
        zIndex: 9999,
        disableForReducedMotion: true,
      });
    }, 600);
  } catch {
    // Fail gracefully if canvas is blocked or unsupported
  }
}

/**
 * Fires celebration sparkles (used for RSVP submit or manual celebration button)
 */
export function fireCenterSparkles(): void {
  try {
    confetti({
      particleCount: 60,
      spread: 75,
      startVelocity: 35,
      origin: { y: 0.6 },
      colors: WEDDING_CONFETTI_COLORS,
      shapes: ['circle', 'star'],
      zIndex: 9999,
      disableForReducedMotion: true,
    });
  } catch {
    // Graceful fallback
  }
}
