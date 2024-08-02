"use client";
import { useEffect, useRef } from "react";
import { type Chart, init } from "klinecharts";
import mitt, { type Emitter } from "mitt";
import "./plugins/lang";

export const KlineChartModule = (() => {
  let chartMemo: Chart;

  const emitter: Emitter<{
    [key: "setup:command" | `overlay:${"create" | "removed"}` | string]: any;
  }> = mitt();

  return () => {
    return {
      // 注册初始化实例
      init() {
        const ref = useRef<HTMLDivElement | any>();
        useEffect(() => {
          chartMemo = init(ref.current, {})!;
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
