import type { Events } from "@/app/hooks/use-event-emitter";
import type { FC } from "react";

export enum ContextMenuEnum {
  CHART = "ContextMenuEnumCHART",
  TEMP = "TEMP"
}
export enum CommandEnum {
  CHART = "CHART",
  TABLE = "TABLE"
}

export interface ExecutionMenuItem {
  label: string | FC;
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
  executor?: (args?: Events["chart:command:creator"]) => any;
  children?: ExecutionMenuItem[];
}
