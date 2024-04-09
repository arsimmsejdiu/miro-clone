import { ColorButtonProps } from "@/interfaces/board-id-interface"
import { colorToCss } from "@/lib/utils"

export const ColorButton = ({
    onClick,
    color,
  }: ColorButtonProps) => {
    return (
      <button
        className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
        onClick={() => onClick(color)}
      >
        <div 
          className="h-8 w-8 rounded-md border border-neutral-300"
          style={{ background: colorToCss(color) }}
        />
      </button>
    )
  }