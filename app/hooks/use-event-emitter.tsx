"use client";

import mitt, { type Emitter } from "mitt";
import { useUnmount } from "ahooks";

export type Events = {
  ["chart:command:resize"]: any;
  ["chart:command:creator"]: { params: { search: string; command?: string } };
  [event: "command:execute" | string]: any;
};
type TEmitter = Emitter<Events>;

const eventEmitterContextEmitter: TEmitter = mitt();
export function useEventEmitterOn<T extends keyof Events>(
  type: T,
  fn: (event: any) => void
) {
  eventEmitterContextEmitter.on<T>(type, (...args) => {
    fn(...args);
  });
  useUnmount(() => {
    eventEmitterContextEmitter.off(type, fn);
  });
}

export function registerCommand<T extends keyof Events>(
  type: T,
  fn: (event: Events[T]) => void
) {
  console.log(type, fn);
  return eventEmitterContextEmitter.on(type, fn);
}
export function executeCommand<T extends keyof Events>(
  type: T,
  args?: Events[T]
) {
  return eventEmitterContextEmitter.emit(type, args);
}
