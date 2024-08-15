import { CommandPosition } from "@/app/commands/index";
import { executeChartCommand } from "@components/KlineCharts/commands";
import { registerCommand } from "@/app/commands/register";
import type {
  Overlay,
  OverlayMode,
  OverlayRemove
} from "couriourc-klinecharts";
import type { WrappedOverlay } from "@components/KlineCharts/types";

//// ！！注册基本实例
registerCommand({
  pos: CommandPosition.Background,
  label: "chart:resize",
  listen: "chart:overlay:resize",
  executor: () => {
    executeChartCommand("resize");
  }
});
// 创建图形
registerCommand({
  pos: CommandPosition.Background,
  label: "chart:creator",
  listen: "chart:overlay:creator",
  executor: (args) => {
    console.log(args);
    executeChartCommand("createOverlay", {
      name: args!.params.command,
      extendData: {
        attributes: {
          label: args!.params.search ? args!.params.search : "未命名",
          type: args!.params.type
        }
      } as WrappedOverlay
    });
  }
});

registerCommand({
  pos: CommandPosition.Background,
  label: "chart:cleanup",
  listen: "chart:overlay:cleanup",
  executor: (overlays: string | OverlayRemove) => {
    /*@ts-ignore*/
    return executeChartCommand("removeOverlay", overlays);
  }
});
///*改变磁吸状态*/
registerCommand({
  pos: CommandPosition.Background,
  label: "chart:cleanup",
  listen: "chart:overlay:magnet",
  executor: (mode: OverlayMode) => {
    return executeChartCommand("overrideOverlay", {
      mode
    });
  }
});
///*改变锁定状态*/

registerCommand({
  pos: CommandPosition.Background,
  label: "chart:lock",
  listen: "chart:overlay:lock",
  executor: (lock: Overlay["lock"]) => {
    return executeChartCommand("overrideOverlay", {
      lock
    });
  }
});
///*改变可见状态*/

registerCommand({
  pos: CommandPosition.Background,
  label: "chart:visible",
  listen: "chart:overlay:visible",
  executor: (visible: Overlay["visible"]) => {
    return executeChartCommand("overrideOverlay", {
      visible
    });
  }
});
