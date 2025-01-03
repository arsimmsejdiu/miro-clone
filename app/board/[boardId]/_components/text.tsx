import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useMutation } from "@/liveblocks.config";

import { TextProps } from "@/interfaces/board-id-interface";
import { cn, colorToCss, calculateFontSize } from "@/lib/utils";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

export const Text = ({
  layer,
  onPointerDown,
  id,
  selectionColor,
}: TextProps) => {
  const { x, y, height, width, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
    >
      <ContentEditable
        html={value || "Text"}
        onChange={handleContentChange}
        className={cn(
          "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
          font.className
        )}
        style={{
          fontSize: calculateFontSize(width, height),
          color: fill ? colorToCss(fill) : "#000",
        }}
      />
    </foreignObject>
  );
};
