"use client";

import mitt, { type Emitter } from "mitt";
import type { OverlayEvent } from "couriourc-klinecharts";
import { useEffect } from "react";

export type Events = {
  ["chart:overlay:resize"]: any;
  ["chart:overlay:creator"]: any;
  ["chart:overlay:cleanup"]: any;
  ["chart:overlay:magnet"]: any;
  ["chart:overlay:lock"]: any;
  ["chart:overlay:visible"]: any;
  ["chart:command:execute"]: any;

  ["chart:setup"]: any;
  ["command:setup"]: any;

  ["chart:overlay:onDrawStart"]: OverlayEvent;
  ["chart:overlay:onDrawing"]: OverlayEvent;
  ["chart:overlay:onDrawEnd"]: OverlayEvent;
  ["chart:overlay:onClick"]: OverlayEvent;
  ["chart:overlay:onDoubleClick"]: OverlayEvent;
  ["chart:overlay:onRightClick"]: OverlayEvent;
  ["chart:overlay:onPressedMoveStart"]: OverlayEvent;
  ["chart:overlay:onPressedMoving"]: OverlayEvent;
  ["chart:overlay:onPressedMoveEnd"]: OverlayEvent;
  ["chart:overlay:onMouseEnter"]: OverlayEvent;
  ["chart:overlay:onMouseLeave"]: OverlayEvent;
  ["chart:overlay:onRemoved"]: OverlayEvent;
  ["chart:overlay:onSelected"]: OverlayEvent;
  ["chart:overlay:onDeselected"]: OverlayEvent;
  [event: string]: any;
};
type TEmitter = Emitter<Events>;

const eventEmitterContextEmitter: TEmitter = mitt();

export default eventEmitterContextEmitter;
export function executeCommand<T extends keyof Events>(
  type: T,
  args?: Events[T]
) {
  return eventEmitterContextEmitter.emit(type, args);
}

export function useCommand<T extends keyof Events>(
  command: T,
  params: (params: Events[T]) => any
) {
  useEffect(() => {
    eventEmitterContextEmitter.on(command, params);
    return () => eventEmitterContextEmitter.off(command, params);
  }, []);
}
