"use client";
import { useEffect, useRef } from "react";
import { ActionType, type Chart, dispose, init } from "couriourc-klinecharts";

import "./plugins/lang";
import "./extensions";
import { defaultTheme } from "./plugins/theme";
import { formatDate } from "./stateFn";
import emitter from "@lib/hooks/use-event-emitter";

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

          const callback = (type: ActionType, data: any) => {
            emitter.emit(`chart:action:${type}`, data);
          };
          const cleanup = [
            ActionType.OnDataReady,
            ActionType.OnZoom,
            ActionType.OnScroll,
            ActionType.OnVisibleRangeChange,
            ActionType.OnTooltipIconClick,
            ActionType.OnCrosshairChange,
            ActionType.OnCandleBarClick,
            ActionType.OnPaneDrag
          ].map((type) => {
            const _callback = (data: any) => callback(type, data);
            chartMemo.subscribeAction(type, _callback);
            return () => chartMemo.unsubscribeAction(type, _callback);
          });
          return () => {
            cleanup.forEach((fn) => fn?.());
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
      emitter: emitter
    };
  };
})();
