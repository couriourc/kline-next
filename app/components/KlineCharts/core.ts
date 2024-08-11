"use client";
import { useEffect, useRef } from "react";
import { type Chart, dispose, init } from "couriourc-klinecharts";
import mitt, { type Emitter } from "mitt";
import "./plugins/lang";
import "./extensions";
import { defaultTheme } from "./plugins/theme";
import { formatDate } from "./stateFn";
import { updateDrawStore } from "@/app/components/KlineCharts/stateFn/store";
import type { WrappedOverlay } from "./types";

export const KlineChartModule = (() => {
  let chartMemo: Chart;

  type EmitterName =
    | string
    | "chart:setup"
    | "command:setup"
    | "overlay:create";
  type EmitterType = {
    [key: EmitterName]: any;
    ["overlay:create"]: WrappedOverlay[];
  };
  const emitter: Emitter<EmitterType> = mitt();

  emitter.on("overlay:create", (overlays) => {
    updateDrawStore((state) => {
      overlays.forEach((overlay) => {
        state.set(overlay.id, overlay);
      });
      return state;
    });
  });

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
      useCommand: <T extends EmitterName>(
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
