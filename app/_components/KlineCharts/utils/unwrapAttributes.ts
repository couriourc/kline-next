import type { WrappedOverlay } from "@components/KlineCharts/types";

export const unwrapAttributes = (
  overlay: WrappedOverlay,
  _key?: keyof WrappedOverlay
) => {
  return overlay;
};
