import { LayerPreviewProps } from "@/interfaces/board-id-interface";
import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/canvas.types";
import { memo } from "react";
import { Path } from "./path";
import { colorToCss } from "@/lib/utils";
import { Note } from "./note";

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerType.Path:
        return (
          <Path
            key={id}
            points={layer.points}
            onPointerDown={(e) => onLayerPointerDown(e, id)}
            x={layer.x}
            y={layer.y}
            fill={layer.fill ? colorToCss(layer.fill) : "#000"}
            stroke={selectionColor}
          />
        );
        case LayerType.Note:
          return (
            <Note
              id={id}
              layer={layer}
              onPointerDown={onLayerPointerDown}
              selectionColor={selectionColor}
            />
          );
      default:
        console.warn("Unknown layer type");
        return null;
    }

    return <div>Layer Preview</div>;
  }
);

LayerPreview.displayName = "LayerPreview";
