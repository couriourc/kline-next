import type { WrappedOverlay } from "@/app/components/KlineCharts/types";

export const unwrapAttributes = (
  overlay: WrappedOverlay,
  _key?: keyof WrappedOverlay
) => {
  return overlay;
};
