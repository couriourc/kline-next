"use client";

import mitt, { type Emitter } from "mitt";

export type Events = {
  ["chart:overlay:resize"]: any;
  ["chart:overlay:creator"]: any;
  ["chart:overlay:cleanup"]: any;
  ["chart:overlay:magnet"]: any;
  ["chart:overlay:lock"]: any;
  ["chart:overlay:visible"]: any;
  ["chart:command:execute"]: any;
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
