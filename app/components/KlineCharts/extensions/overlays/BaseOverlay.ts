import type { OverlayTemplate } from "couriourc-klinecharts";
import {
  drawStore,
  pickOverlayId,
  updateDrawStore
} from "@/app/components/KlineCharts/stateFn/store";
import type { WrappedOverlay } from "@/app/components/KlineCharts/types";

export const create = (fn: () => Omit<OverlayTemplate, "onDrawStart">) => {
  const pre = fn();
  const dfs = (vm, key, getter, setter) => {
    Object.defineProperty(vm, "visible", {
      get: getter,
      set: setter
    });
    return;
  };

  return {
    ...(pre as OverlayTemplate),
    onDrawEnd: (args) => {
      console.log(args);
      dfs(
        args.overlay.extendData as WrappedOverlay,
        "overlay",
        () => args.overlay,
        () => true
      );

      return pre.onDrawEnd?.(args) || true;
    },
    createPointFigures: (args) => {
      const id = pickOverlayId(args.overlay.extendData as WrappedOverlay);
      const store = drawStore().get(id);
      dfs(
        args.overlay,
        "visible",
        () => store?.attributes.visible,
        (value) => {
          store!.attributes.visible = value;
          updateDrawStore(new Map(drawStore()));
          return true;
        }
      );

      return pre.createPointFigures?.(args, store) || [];
    }
  };
};
