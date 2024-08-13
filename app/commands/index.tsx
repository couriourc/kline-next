import {
  fibonacciTool,
  homeNavTools,
  moreLineTool,
  polyTool,
  singleLineTool,
  textTool,
  waveTool
} from "@/app/commands/homeNavTools";
import type { ExecutionMenuItem } from "@/app/components/ui/ContextMenu/types";
import { executionMenuList } from "@/app/commands/contextMenuCommands";
import { mainCommands } from "@/app/commands/mainCommands";
import { useHotkeys } from "@mantine/hooks";
import type { HotkeyItem } from "@mantine/hooks/lib/use-hotkeys/use-hotkeys";

export enum CommandPosition {
  Header = "Header",
  Nav = "Nav",
  Footer = "Footer",
  Docker = "Docker",
  ContentMenu = "ContentMenu",
  Sidebar = "Sidebar",
  Main = "Main"
}

type IPresetCommand = {
  [key in CommandPosition]: ExecutionMenuItem[];
};
const presetCommands: IPresetCommand = {
  [CommandPosition.Header]: [] as ExecutionMenuItem[],
  [CommandPosition.Docker]: [
    singleLineTool,
    moreLineTool,
    polyTool,
    fibonacciTool,
    waveTool,
    textTool,
    ...homeNavTools
  ],
  [CommandPosition.ContentMenu]: executionMenuList,
  [CommandPosition.Nav]: [],
  [CommandPosition.Footer]: [],
  [CommandPosition.Sidebar]: [],
  [CommandPosition.Main]: mainCommands
};

export function getCommandsByPosition(position: CommandPosition) {
  return presetCommands[position];
}

export function useSetupCommandsByPosition(position: CommandPosition) {
  const commands = getCommandsByPosition(position);
  commands
    .filter((item) => !item.disabled)
    .forEach((item) => {
      item.setup?.();
    });

  useHotkeys(
    commands
      .filter((item) => !item.disabled)
      .filter((item) => item.shortcuts)
      .map((tool) => {
        if (!tool.shortcuts) return [] as unknown as HotkeyItem;
        return [tool.shortcuts, () => tool.executor?.()] as HotkeyItem;
      })
  );
}
