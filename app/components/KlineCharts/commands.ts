"use client";
import { KlineChartModule } from "./core";
import type { OverlayCreate } from "couriourc-klinecharts";
import _ from "underscore";
import { updateDrawStore } from "./stateFn/store";
import type { ICommands } from "./types";
import { makeAttributes } from "@/app/components/KlineCharts/utils/makeAttributes";

const klineChartInstance = KlineChartModule();

function arrifyOverlay<T>(target: T | T[]): T[] {
  return _.isArray(target) ? target : [target];
}

type OverlayCreatorOverrid = OverlayCreate & {
  setup: boolean;
};
const createOverlay: ICommands["createOverlay"] = (overlayCreator, paneId) => {
  const wrapperOverlayFunction = (nameOrOption: string | OverlayCreate) => {
    const option: OverlayCreatorOverrid = {
      setup: false
    } as OverlayCreatorOverrid;
    if (_.isString(nameOrOption)) {
      option.name = nameOrOption;
    } else {
      Object.assign(option, nameOrOption);
    }

    (
      [
        "onDrawStart",
        "onDrawing",
        "onDrawEnd",
        "onClick",
        "onDoubleClick",
        "onRightClick",
        "onPressedMoveStart",
        "onPressedMoving",
        "onPressedMoveEnd",
        "onMouseEnter",
        "onMouseLeave",
        "onRemoved",
        "onSelected",
        "onDeselected"
      ] as const
    ).forEach((fnName) => {
      const fn = option[fnName];
      switch (fnName) {
        case "onRightClick":
          option[fnName] = (...args) => {
            const event = args[0];
            event.preventDefault?.();
            fn?.(...args);
            return true;
          };
          break;
        case "onRemoved":
          option[fnName] = (...args) => {
            const overlay = args[0].overlay;
            klineChartInstance.emitter.emit("overlay:removed", overlay);
            updateDrawStore((state) => {
              state.delete(option.extendData.id);
              return state;
            });
            fn?.(...args);
            return true;
          };
          break;
        default:
          break;
      }
    });
    // 内置信息
    option.extendData = makeAttributes();
    return option as OverlayCreate;
  };
  const wrapperOverlayCreator = arrifyOverlay(overlayCreator).map(
    wrapperOverlayFunction
  );
  const overlayIds: string[] = klineChartInstance.chart.createOverlay(
    wrapperOverlayCreator,
    paneId
  ) as string[];
  // 附加 overlay_id
  wrapperOverlayCreator.forEach((item, id) => {
    item.extendData.overlay_id = overlayIds[id]! as string;
    return item.extendData;
  });
  // 创建覆层
  klineChartInstance.emitter.emit(
    "overlay:create",
    wrapperOverlayCreator.map((item) => item.extendData)
  );
  // 获取
  return overlayIds;
};
const removeOverlay: ICommands["removeOverlay"] = (...args) => {
  if (!args[0]) {
    return updateDrawStore((state) => {
      state.forEach((overlayExtend, _id) => {
        klineChartInstance.chart.removeOverlay(overlayExtend.id);
      });
      return state;
    });
  }
  const overlayIds = arrifyOverlay(args[0]);
  // 移除覆层
  klineChartInstance.emitter.emit(
    "overlay:removed",
    getOverlayByIds(overlayIds as string[])
  );
  return klineChartInstance.chart.removeOverlay(...args);
};
const getOverlayByIds: ICommands["getOverlayByIds"] = (...args) => {
  const overlayIds = arrifyOverlay(args[0]);
  return overlayIds.map((idOrOption) => {
    if (_.isString(idOrOption)) {
      return klineChartInstance.chart.getOverlayById(idOrOption);
    }
    return klineChartInstance.chart.getOverlayById(idOrOption.id!);
  });
};
const overrideOverlay: ICommands["overrideOverlay"] = (...args) =>
  klineChartInstance.chart.overrideOverlay(...args);
const resize: ICommands["resize"] = () => {
  return klineChartInstance.chart?.resize();
};
const commands: ICommands = {
  createOverlay,
  removeOverlay,
  getOverlayByIds,
  resize,
  overrideOverlay
};

export function executeChartCommand<T extends keyof ICommands>(
  type: T,
  ...args: ICommands[T] extends (...args: infer P) => any ? P : never[]
): void {
  klineChartInstance.emitter.emit("command:setup", {
    type,
    args
  });
  /*@ts-ignore*/
  return commands[type as keyof ICommands](...args);
}
