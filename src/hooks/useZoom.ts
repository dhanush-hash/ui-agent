import { useCallback, useState } from 'react';

/**
 * Discrete zoom levels for the canvas. Each maps to a static Tailwind `scale-*`
 * utility so the transform can be applied via `className` (no inline styles).
 */
const ZOOM_LEVELS = [50, 75, 90, 100, 110, 125, 150] as const;

const SCALE_CLASS: Record<(typeof ZOOM_LEVELS)[number], string> = {
  50: 'scale-50',
  75: 'scale-75',
  90: 'scale-90',
  100: 'scale-100',
  110: 'scale-110',
  125: 'scale-125',
  150: 'scale-150',
};

const DEFAULT_LEVEL = 100;

export interface UseZoomResult {
  /** Current zoom as a percentage, e.g. `100`. */
  zoom: number;
  /** Tailwind class for the current zoom, e.g. `scale-100`. */
  scaleClass: string;
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
}

/** Manages discrete canvas zoom state. */
export function useZoom(initial: number = DEFAULT_LEVEL): UseZoomResult {
  const startIndex = Math.max(0, ZOOM_LEVELS.indexOf(initial as (typeof ZOOM_LEVELS)[number]));
  const [index, setIndex] = useState(startIndex === -1 ? ZOOM_LEVELS.indexOf(DEFAULT_LEVEL) : startIndex);

  const zoomIn = useCallback(() => {
    setIndex((i) => Math.min(i + 1, ZOOM_LEVELS.length - 1));
  }, []);

  const zoomOut = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setIndex(ZOOM_LEVELS.indexOf(DEFAULT_LEVEL));
  }, []);

  const zoom = ZOOM_LEVELS[index];

  return {
    zoom,
    scaleClass: SCALE_CLASS[zoom],
    zoomIn,
    zoomOut,
    reset,
    canZoomIn: index < ZOOM_LEVELS.length - 1,
    canZoomOut: index > 0,
  };
}
