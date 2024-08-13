import { updateDrawStore } from "@/app/components/KlineCharts/stateFn/store";
import { KlineChartModule, LifeCycle } from "@/app/components/KlineCharts/core";
import type { WrappedOverlay } from "@/app/components/KlineCharts/types";

const { emitter } = KlineChartModule();
emitter.on(`overlay:${LifeCycle.onDrawEnd}`, (overlays) => {
  (overlays.overlay.extendData as WrappedOverlay).overlay_id =
    overlays.overlay.id;
  (overlays.overlay.extendData as WrappedOverlay)._event = overlays;

  updateDrawStore(overlays.overlay.extendData);
});
