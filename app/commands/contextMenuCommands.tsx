import {
  CommandEnum,
  type ExecutionMenuItem
} from "@components/ui/ContextMenu/types";
import { executeCommand } from "@/app/hooks/use-event-emitter";
import { Text } from "@mantine/core";
import { registerCommand } from "@/app/commands/register";
import { CommandPosition } from "@/app/commands/index";

/**
 * 快捷方式的权重计算
 * 满足 category
 * 满足 equal
 * */
export const executionMenuList: ExecutionMenuItem[] = [
  {
    label: () => (
      <Text className={"flex items-center"}>
        <i className={"i-mdi-refresh"}></i>
        重置图表视图
      </Text>
    ),
    command: "refreshChartView",
    isEqual: () => true,
    category: CommandEnum.CHART
  },
  {
    label: "刷新",
    command: "refresh",
    isEqual: () => true,
    category: CommandEnum.CHART,
    executor() {
      location.reload();
    }
  },
  {
    label: "复制价格",
    command: "copyPrice",
    isEqual: () => true,
    category: CommandEnum.CHART
  },
  {
    label: "粘贴",
    command: "pasteKLineData",
    isEqual: () => true,
    category: CommandEnum.CHART
  },
  {
    label: "主题颜色",
    command: "changeChartTheme",
    isEqual: () => true,
    category: CommandEnum.CHART
  },
  {
    label: "移除绘图",
    command: "removeDrawLayer",
    isEqual: () => true,
    category: CommandEnum.CHART,
    executor() {
      executeCommand("chart:overlay:cleanup");
    }
  },
  {
    label: "移除指标",
    command: "hideIndicator",
    isEqual: () => true,
    category: CommandEnum.CHART
  },
  {
    label: "添加文本标记",
    command: "createTextOverlay",
    isEqual: () => true,
    category: CommandEnum.CHART,
    executor(args) {
      executeCommand("chart:overlay:creator", {
        ...args,
        params: {
          ...(args.params ?? {}),
          command: "textInput"
        }
      });
    }
  },
  {
    label: "下载本页标记",
    isEqual: () => true
  },
  {
    label: "查看涂层",
    isEqual: () => true,
    executor(args) {
      args?.router?.push("/home/layers");
      executeCommand("view:layers", "/home/layers");
    }
  }
];

executionMenuList.forEach((item) =>
  registerCommand({
    ...item,
    pos: CommandPosition.ContentMenu
  })
);
