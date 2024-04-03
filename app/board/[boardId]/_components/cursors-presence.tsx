"use client";

import { memo } from "react";
import { Drafts } from "./drafts";
import { Cursors } from "./cursors";

export const CursorsPresence = memo(() => {
  return (
    <>
    <Drafts />
    <Cursors />
  </>
  )
})

CursorsPresence.displayName = "CursorsPresence";
