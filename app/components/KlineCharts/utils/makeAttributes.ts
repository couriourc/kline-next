import type { WrappedOverlay } from "@/app/components/KlineCharts/types";
import _ from "underscore";

export function makeAttributes(): WrappedOverlay {
  return {
    id: _.uniqueId("overlay_"),
    attributes: {
      label: "未命名",
      visible: true
    },
    styles: {},
    timestamp: Date.now()
  };
}
