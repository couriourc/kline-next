"use client";
import Router from "next/router";
import type { ExecutionMenuItem } from "@/app/components/ui/ContextMenu/types";
import { executeCommand } from "@/app/hooks/use-event-emitter";
import { OverlayMode } from "couriourc-klinecharts";

export const rightTools: ExecutionMenuItem[] = [
  {
    label: "添加文本",
    description: "添加标记文本",
    icon: "i-material-symbols-light-text-fields ",
    key: "add-text",
    command: "createTextOverlay",
    executor() {
      executeCommand("chart:command:creator", {
        params: {
          search: "",
          command: "createTextOverlay"
        }
      });
    }
  },
  {
    label: "移除",
    description: "移除",
    icon: "i-mdi-trash ",
    key: "remove-all",
    command: "removeAllOverlay",
    executor() {
      executeCommand("chart:command:cleanup", {
        params: {}
      });
    }
  },
  {
    label: "磁吸",
    description: "磁吸",
    icon: "i-mdi-magnet ",
    key: "change-magnet",
    command: "changeMagnet",
    executor() {
      executeCommand("chart:command:magnet", OverlayMode.StrongMagnet);
    }
  },
  {
    label: "锁定",
    description: "锁定所有绘图",
    icon: "i-[mdi--lock-open-outline]",
    key: "change-lock",
    command: "changeMagnet",
    executor() {
      executeCommand("chart:command:magnet", OverlayMode.StrongMagnet);
    }
  },
  {
    label: "隐藏",
    description: "隐藏绘图",
    icon: "i-mdi-eye",
    key: "change-eye",
    command: "changeVisible",
    executor() {
      executeCommand("chart:command:visible");
    }
  },
  {
    label: "层级",
    description: "层级",
    icon: "i-[material-symbols-light--layers-outline-rounded]",
    key: "change-layers",
    command: "changeLayers",
    executor() {
      Router.push("/layers");
    }
  }
];
