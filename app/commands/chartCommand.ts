import { registerCommand } from "@/app/hooks/use-event-emitter";
import { executeChartCommand } from "@/app/components/KlineCharts/commands";
import type { OverlayMode } from "couriourc-klinecharts";
import { removeDrawStore } from "@/app/components/KlineCharts/stateFn/store";
import type { WrappedOverlay } from "@/app/components/KlineCharts/types";
// ！！注册基本实例
// 系统局部指令
registerCommand("chart:command:resize", () => {
  executeChartCommand("resize");
});
// 创建图形指令
registerCommand("chart:command:creator", (args) => {
  executeChartCommand("createOverlay", {
    name: args.params.command!,
    extendData: {
      text: args.params.search ?? ""
    }
  });
});
// 移除图形指令
registerCommand("chart:command:cleanup", (overlays: WrappedOverlay[]) => {
  removeDrawStore(overlays);
  overlays.forEach((overlay) => {
    /*@ts-ignore*/
    return executeChartCommand("removeOverlay", {
      groupId: overlay.id as string
    });
  });
});
/*改变磁吸状态*/
registerCommand("chart:command:magnet", (mode: OverlayMode) => {
  executeChartCommand("overrideOverlay", {
    mode: mode as OverlayMode
  });
});
/*改变锁定状态*/
registerCommand("chart:command:lock", (lock: boolean) => {
  executeChartCommand("overrideOverlay", {
    lock: lock
  });
});
/*改变可见状态*/
registerCommand("chart:command:visible", (visible: boolean) => {
  executeChartCommand("overrideOverlay", {
    visible: visible
  });
});
/**/
