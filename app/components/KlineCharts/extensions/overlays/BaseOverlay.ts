import type {
  Overlay,
  OverlayCreateFiguresCallbackParams,
  OverlayEvent,
  OverlayFigure,
  OverlayTemplate
} from "couriourc-klinecharts";
import {
  drawStore,
  pickOverlayId,
  updateDrawStore
} from "@/app/components/KlineCharts/stateFn/store";
import type { WrappedOverlay } from "@/app/components/KlineCharts/types";

export interface BaseOverlay extends OverlayTemplate {
  createPointFigures(
    args: OverlayCreateFiguresCallbackParams,
    store?: WrappedOverlay
  ): OverlayFigure[];
}

type DefineOverlay = (
  fn: () => Omit<BaseOverlay, "onDrawStart">
) => OverlayTemplate;
export const create: DefineOverlay = (fn) => {
  const pre = fn() as BaseOverlay;
  const dfs = (
    vm: WrappedOverlay | Overlay,
    key: string,
    getter: (...args: any) => any,
    setter: (...args: any) => any
  ) => {
    Object.defineProperty(vm, key, {
      get: getter,
      set: setter
    });
    return;
  };

  const getOverlayStore = (overlay: WrappedOverlay) => {
    const id = pickOverlayId(overlay);
    return drawStore().get(id)!;
  };

  return {
    ...(pre as OverlayTemplate),
    onDrawStart: (args) => {
      const store = getOverlayStore(args.overlay.extendData);
      dfs(
        args.overlay,
        "visible",
        () => store?.attributes.visible,
        (value: boolean) => {
          store!.attributes.visible = value;
          updateDrawStore([store!]);
          return true;
        }
      );
      return true;
    },
    onDrawEnd: (args: OverlayEvent) => {
      dfs(
        args.overlay.extendData as WrappedOverlay,
        "overlay",
        () => args.overlay,
        () => true
      );
      return pre.onDrawEnd?.(args) || true;
    },
    createPointFigures: (args: OverlayCreateFiguresCallbackParams) => {
      const store = getOverlayStore(args.overlay.extendData);
      return pre.createPointFigures?.(args, store) || [];
    }
  } as OverlayTemplate;
};
