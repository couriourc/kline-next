"use client";
import type { PropsWithChildren } from "react";
import { registerCommand } from "@/app/hooks/use-event-emitter";
import { executeChartCommand } from "@/app/components/KlineCharts/commands";
// ！！注册基本实例
// 系统局部指令
registerCommand("chart:command:resize", () => {
  executeChartCommand("resize");
});
// 创建图形指令
registerCommand("chart:command:creator", (args) => {
  executeChartCommand("createOverlay", {
    name: "textInput",
    extendData: {
      text: args.params.search ?? "asd"
    }
  });
});
// 移除图形指令

const CommandInitor = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default CommandInitor;
