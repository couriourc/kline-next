import { updateDrawStore } from "@/app/components/KlineCharts/stateFn/store";
import { KlineChartModule } from "@/app/components/KlineCharts/core";
const { emitter } = KlineChartModule();
emitter.on("overlay:onDrawStart", (overlays) => {
  updateDrawStore(overlays);
});

emitter.on("overlay:onDrawEnd", (overlays) => {
  console.log(overlays);
});
