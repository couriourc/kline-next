"use client";
import { useEffect, useRef } from "react";
import { type Chart, dispose, init } from "couriourc-klinecharts";
import mitt, { type Emitter } from "mitt";
import "./plugins/lang";
import "./extensions";
import { defaultTheme } from "./plugins/theme";
import { formatDate } from "./stateFn";
import type { WrappedOverlay } from "./types";

export enum LifeCycle {
  onDrawStart = "onDrawStart",
  onDrawing = "onDrawing",
  onDrawEnd = "onDrawEnd",
  onClick = "onClick",
  onDoubleClick = "onDoubleClick",
  onRightClick = "onRightClick",
  onPressedMoveStart = "onPressedMoveStart",
  onPressedMoving = "onPressedMoving",
  onPressedMoveEnd = "onPressedMoveEnd",
  onMouseEnter = "onMouseEnter",
  onMouseLeave = "onMouseLeave",
  onRemoved = "onRemoved",
  onSelected = "onSelected",
  onDeselected = "onDeselected"
}

export const KlineChartModule = (() => {
  let chartMemo: Chart;

  type EmitterType = {
    [key: string]: any;

    ["chart:setup"]: any;
    ["command:setup"]: any;

    ["overlay:onDrawStart"]: WrappedOverlay[];
    ["overlay:onDrawing"]: WrappedOverlay[];
    ["overlay:onDrawEnd"]: WrappedOverlay[];
    ["overlay:onClick"]: WrappedOverlay[];
    ["overlay:onDoubleClick"]: WrappedOverlay[];
    ["overlay:onRightClick"]: WrappedOverlay[];
    ["overlay:onPressedMoveStart"]: WrappedOverlay[];
    ["overlay:onPressedMoving"]: WrappedOverlay[];
    ["overlay:onPressedMoveEnd"]: WrappedOverlay[];
    ["overlay:onMouseEnter"]: WrappedOverlay[];
    ["overlay:onMouseLeave"]: WrappedOverlay[];
    ["overlay:onRemoved"]: WrappedOverlay[];
    ["overlay:onSelected"]: WrappedOverlay[];
    ["overlay:onDeselected"]: WrappedOverlay[];
  };
  const emitter: Emitter<EmitterType> = mitt();

  return () => {
    return {
      // 注册初始化实例
      init() {
        const ref = useRef<HTMLDivElement | any>();
        useEffect(() => {
          chartMemo = init(ref.current, {
            customApi: {
              formatDate: formatDate
            },
            styles: defaultTheme
          })!;
          emitter.emit("chart:setup", chartMemo);

          return () => {
            emitter.emit("chart:destroy", chartMemo);
            dispose(ref.current);
          };
        }, []);
        return {
          ref
        };
      },
      // 读取缓存的单实例
      get chart() {
        return chartMemo!;
      },
      emitter: emitter,
      useCommand: <T extends keyof EmitterType>(
        command: T,
        params: (args: EmitterType[T]) => void
      ) => {
        useEffect(() => {
          emitter.on(command, params);
          return () => emitter.off(command, params);
        }, []);
      }
    };
  };
})();
