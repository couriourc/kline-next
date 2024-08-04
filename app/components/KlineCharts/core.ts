"use client";
import { useEffect, useRef } from "react";
import { type Chart, init } from "couriourc-klinecharts";
import mitt, { type Emitter } from "mitt";
import "./plugins/lang";
import "@/vendors/index";
export const KlineChartModule = (() => {
  let chartMemo: Chart;

  const emitter: Emitter<{
    [
      key:
        | "chart:setup"
        | "command:setup"
        | `overlay:${"create" | "removed"}`
        | string
    ]: any;
  }> = mitt();

  return () => {
    return {
      // 注册初始化实例
      init() {
        const ref = useRef<HTMLDivElement | any>();
        useEffect(() => {
          console.log(chartMemo);
          chartMemo = init(ref.current, {
            customApi: {}
          })!;
          emitter.emit("chart:setup", chartMemo);
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
