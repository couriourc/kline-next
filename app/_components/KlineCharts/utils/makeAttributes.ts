import type { WrappedOverlay } from "@components/KlineCharts/types";
import _ from "underscore";
import { deepMerge } from "@antfu/utils";

export function makeAttributes(origin?: any): WrappedOverlay {
  return deepMerge(
    {
      id: _.uniqueId("overlay_"),
      attributes: {
        label: "未命名",
        visible: true,
        timestamp: Date.now()
      },
      overlay_event: {
        selected: false
      },
      styles: {}
    },
    origin ?? {}
  ) as WrappedOverlay;
}
