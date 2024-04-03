import { COLORS } from "@/assets/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  Camera,
  Color,
  Layer,
  LayerType,
  PathLayer,
  Point,
  Side,
  XYWH,
} from "@/types/canvas.types";

/**
 * Combines multiple class values into a single string using the 'clsx' and 'twMerge' functions.
 *
 * @param inputs - The class values to combine.
 * @returns A string representing the combined class values.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the color associated with a given connection ID.
 * 
 * @param connectionId - The connection ID.
 * @returns The color associated with the connection ID.
 */
export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

/**
 * Converts a pointer event to a canvas point relative to the camera position.
 *
 * @param e - The pointer event object.
 * @param camera - The camera object containing the x and y coordinates.
 * @returns An object with the x and y coordinates of the canvas point.
 */
export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}

/**
 * Converts a Color object to a CSS color string.
 *
 * @param color - The Color object to convert.
 * @returns The CSS color string representation of the Color object.
 */
export function colorToCss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g
    .toString(16)
    .padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
}

/**
 * Resizes the bounds of a rectangle based on a corner and a point.
 * 
 * @param bounds - The original bounds of the rectangle.
 * @param corner - The corner of the rectangle to resize.
 * @param point - The point to resize the rectangle to.
 * @returns The resized bounds of the rectangle.
 */
export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  if ((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
}

/**
 * Finds the intersecting layers with a given rectangle.
 *
 * @param {readonly string[]} layerIds - The array of layer IDs to check for intersection.
 * @param {ReadonlyMap<string, Layer>} layers - The map of layers.
 * @param {Point} a - The first point of the rectangle.
 * @param {Point} b - The second point of the rectangle.
 * @returns {string[]} - The array of layer IDs that intersect with the rectangle.
 */
export function findIntersectingLayersWithRectangle(
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point
) {
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };

  const ids = [];

  for (const layerId of layerIds) {
    const layer = layers.get(layerId);

    if (layer == null) {
      continue;
    }

    const { x, y, height, width } = layer;

    if (
      rect.x + rect.width > x &&
      rect.x < x + width &&
      rect.y + rect.height > y &&
      rect.y < y + height
    ) {
      ids.push(layerId);
    }
  }

  return ids;
}

/**
 * Calculates the contrasting text color based on the given color.
 * 
 * @param color - The color object with RGB values.
 * @returns The contrasting text color, either "black" or "white".
 */
export function getContrastingTextColor(color: Color) {
  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

  return luminance > 182 ? "black" : "white";
}

/**
 * Converts an array of pen points to a PathLayer object.
 * 
 * @param points - The array of pen points to be converted.
 * @param color - The color to be used for the fill of the PathLayer.
 * @returns The converted PathLayer object.
 * @throws Error if the number of points is less than 2.
 */
export function penPointsToPathLayer(
  points: number[][],
  color: Color
): PathLayer {
  if (points.length < 2) {
    throw new Error("Cannot transform points with less than 2 points");
  }

  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;

    if (left > x) {
      left = x;
    }

    if (top > y) {
      top = y;
    }

    if (right < x) {
      right = x;
    }

    if (bottom < y) {
      bottom = y;
    }
  }

  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points.map(([x, y, pressure]) => [x - left, y - top, pressure]),
  };
}

/**
 * Generates an SVG path string from a stroke array.
 *
 * @param stroke - The stroke array containing the coordinates of the stroke points.
 * @returns The SVG path string representing the stroke.
 */
export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
}
