"use client";

import { useEffect } from "react";
import { readFirstTouch } from "@/lib/first-touch";

/** Records the first page of a visit so a later project brief can say where its sender arrived. Renders nothing. */
export function FirstTouch() {
  useEffect(() => {
    readFirstTouch();
  }, []);
  return null;
}
