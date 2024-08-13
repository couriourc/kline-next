import {
  fibonacciTool,
  moreLineTool,
  polyTool,
  singleLineTool,
  textTool,
  waveTool
} from "@/app/commands/homeNavTools";
import type { ExecutionMenuItem } from "@/app/components/ui/ContextMenu/types";
import { executionMenuList } from "@/app/commands/contextMenuCommands";

export enum CommandPosition {
  Header = "Header",
  Nav = "Nav",
  Footer = "Footer",
  Docker = "Docker",
  ContentMenu = "ContentMenu",
  Sidebar = "Sidebar"
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
    textTool
  ],
  [CommandPosition.ContentMenu]: executionMenuList,
  [CommandPosition.Nav]: [],
  [CommandPosition.Footer]: [],
  [CommandPosition.Sidebar]: []
};

export function getCommandsByPosition(position: CommandPosition) {
  return presetCommands[position];
}
