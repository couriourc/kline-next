import { useAtomValue } from "jotai/index";
import { LifeCycle } from "@components/KlineCharts/core";
import type { WrappedOverlay } from "@components/KlineCharts/types";
import { registerCommand } from "./register";
import { CommandPosition } from "./index";
import { mutationLabelKlineA } from "../store/chartStore";
import { useCommand } from "@lib/hooks/use-event-emitter";

registerCommand({
  label: "上传标记信息",
  pos: CommandPosition.Main,
  setup() {
    // post line
    const { mutate: handleMutationLabelKlineA } =
      useAtomValue(mutationLabelKlineA);
    useCommand(`chart:overlay:${LifeCycle.onDrawEnd}`, async (ev: any) => {
      return handleMutationLabelKlineA({
        pos: `${ev.overlay.points[0].timestamp}`,
        k_type: 0,
        adjust_type: 0,
        label_type:
          (ev.overlay.extendData as WrappedOverlay).attributes.type ?? "text",
        label_text: (ev.overlay.extendData as WrappedOverlay).attributes.label
      });
    });
  }
});
