import type { Events } from "@/app/hooks/use-event-emitter";

export enum ContextMenuEnum {
  CHART = "ContextMenuEnumCHART",
  TEMP = "TEMP"
}
export enum CommandEnum {
  CHART = "CHART",
  TABLE = "TABLE"
}

export interface ExecutionMenuItem {
  label: string;
  description?: string;
  icon?: string;
  key?: string;
  command?: string;
  category?: CommandEnum;
  isEqual?: (
    item: string,
    raw: ExecutionMenuItem,
    paneId?: ContextMenuEnum
  ) => boolean;
  executor?: (args?: Events["chart:command:creator"]) => any;
}
