import { createSignal } from "solid-js";
import type { WrappedOverlay } from "@/app/components/KlineCharts/types";

export const [drawStore, updateDrawStore] = createSignal(
  new Map<WrappedOverlay["id"], WrappedOverlay>()
);
export const pickOverlayId = (overlay: WrappedOverlay) => overlay.id;
