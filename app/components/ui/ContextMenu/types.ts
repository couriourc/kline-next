import type { FC } from "react";
import type { CommandPosition } from "@/app/commands";

export enum ContextMenuEnum {
  CHART = "ContextMenuEnumCHART",
  TEMP = "TEMP"
}
export enum CommandEnum {
  CHART = "CHART"
}

export interface ExecutionMenuItem {
  label: string | FC<{ search?: string }>;
  description?: string;
  icon?: string;
  key?: string;
  command?: string;
  shortcuts?: string;
  disabled?: boolean;
  hidden?: boolean;
  category?: CommandEnum;
  isEqual?: (
    item: string,
    raw: ExecutionMenuItem,
    paneId?: ContextMenuEnum
  ) => boolean;
  onChildExecute?: (child: ExecutionMenuItem) => any;
  executor?: (args?: any) => any;
  children?: ExecutionMenuItem[];
  pos?: CommandPosition;
  setup?: () => any;
  listen?: string | string[];
}
