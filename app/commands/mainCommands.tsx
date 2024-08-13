import type { ExecutionMenuItem } from "@/app/components/ui/ContextMenu/types";
import { useAtomValue } from "jotai/index";
import { mutationLabelKlineA } from "@/app/store/chartStore";
import { KlineChartModule, LifeCycle } from "@/app/components/KlineCharts/core";
import type { WrappedOverlay } from "@/app/components/KlineCharts/types";

export const mainCommands: ExecutionMenuItem[] = [
  {
    label: "添加标记",
    setup() {
      // post line
      const klineChartMemo = KlineChartModule();
      const { mutate: handleMutationLabelKlineA } =
        useAtomValue(mutationLabelKlineA);
      klineChartMemo.useCommand(
        `overlay:${LifeCycle.onDrawEnd}`,
        async (ev) => {
          return handleMutationLabelKlineA({
            pos: `${ev.overlay.points[0].timestamp}`,
            k_type: 0,
            adjust_type: 0,
            label_type:
              (ev.overlay.extendData as WrappedOverlay).attributes.type ??
              "text",
            label_text: (ev.overlay.extendData as WrappedOverlay).attributes
              .label
          });
        }
      );
    }
  }
];
