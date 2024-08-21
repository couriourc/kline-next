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
} from "@components/KlineCharts/stateFn/store";
import type { WrappedOverlay } from "@components/KlineCharts/types";
import _ from "underscore";

export interface BaseOverlay extends OverlayTemplate {
  createPointFigures?(
    args: OverlayCreateFiguresCallbackParams,
    store?: WrappedOverlay
  ): OverlayFigure[];

  onSelected?(args: OverlayEvent, store?: WrappedOverlay): boolean;

  onDeselected?(args: OverlayEvent, store?: WrappedOverlay): boolean;
  onMouseEnter?(args: OverlayEvent, store?: WrappedOverlay): boolean;
  onMouseLeave?(args: OverlayEvent, store?: WrappedOverlay): boolean;
}
export enum MouseEventType {
  MOUSE_ENTER = "mouseenter",
  MOUSE_LEAVE = "MOUSE_LEAVE"
}
type DefineOverlay = (
  fn: () => Omit<BaseOverlay, "onDrawStart">
) => OverlayTemplate;
export const create: DefineOverlay = (fn) => {
  const pre = (_.isFunction(fn) ? fn() : fn) as BaseOverlay;
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
    onSelected: (args) => {
      const store = getOverlayStore(args.overlay.extendData);
      store!.overlay_event!.selected = true;
      return pre?.onSelected(args, store);
    },
    onDeselected: (args) => {
      const store = getOverlayStore(args.overlay.extendData);
      store!.overlay_event!.selected = false;
      return pre?.onDeselected(args, store);
    },
    onMouseEnter: (args) => {
      const store = getOverlayStore(args.overlay.extendData);
      store!.overlay_event!.mouse_event = MouseEventType.MOUSE_ENTER;
      return pre?.onMouseEnter(args, store);
    },
    onMouseLeave: (args) => {
      const store = getOverlayStore(args.overlay.extendData);
      store!.overlay_event!.mouse_event = MouseEventType.MOUSE_LEAVE;
      return pre?.onMouseLeave(args, store);
    },

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
