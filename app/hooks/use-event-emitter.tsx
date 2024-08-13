"use client";

import mitt, { type Emitter } from "mitt";
import { useUnmount } from "ahooks";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type Events = {
  ["chart:command:resize"]: any;
  ["chart:command:creator"]: {
    params: { search?: string; command?: string };
    router?: AppRouterInstance;
  };
  ["chart:command:cleanup"]: any;
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
  return eventEmitterContextEmitter.on(type, fn);
}
export function executeCommand<T extends keyof Events>(
  type: T,
  args?: Events[T]
) {
  return eventEmitterContextEmitter.emit(type, args);
}
