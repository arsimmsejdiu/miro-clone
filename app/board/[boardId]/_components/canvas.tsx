"use client";

import { nanoid } from "nanoid";
import { useCallback, useMemo, useState, useEffect } from "react";
import { LiveObject } from "@liveblocks/client";
import { Info } from "./info";
import { Participants } from "./participants";
import { CanvasProps } from "@/interfaces/board-id-interface";
import { Toolbar } from "./toolbar";

export const Canvas = ({boardId}: CanvasProps) => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </main>
  );
};
