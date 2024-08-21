import { updateDrawStore } from "@components/KlineCharts/stateFn/store";
import { KlineChartModule, LifeCycle } from "@components/KlineCharts/core";
import type { WrappedOverlay } from "@components/KlineCharts/types";

const { emitter } = KlineChartModule();
emitter.on(`chart:overlay:${LifeCycle.onDrawEnd}`, (overlays) => {
  (overlays.overlay.extendData as WrappedOverlay).overlay_id =
    overlays.overlay.id;
  (overlays.overlay.extendData as WrappedOverlay)._event = overlays;
  updateDrawStore(overlays.overlay.extendData);
});
