import { useKlineChart } from "@/app/components/KlineCharts/core";
import type { ICommands } from "@/app/components/KlineCharts/type";
import type { OverlayCreate } from "klinecharts";
import _ from "underscore";
import { defaultOverlayExtendData } from "@/app/components/KlineCharts/schema";

const klineChartInstance = useKlineChart();

function arrifyOverlay<T>(target: T | T[]): T[] {
  /*@ts-ignore*/
  return _.isArray(target) ? target : [target];
}

const createOverlay: ICommands["createOverlay"] = (overlayCreator, paneId) => {
  const wrapperOverlayFunction = (nameOrOption: string | OverlayCreate) => {
    const option: OverlayCreate = {} as OverlayCreate;
    if (_.isString(nameOrOption)) {
      option.name = nameOrOption;
    } else {
      Object.assign(option, nameOrOption);
    }

    ([
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
    ] as const).forEach((fnName) => {
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
            fn?.(...args);
            return true;
          };
          break;
        default:
          /*@ts-ignore*/
          option[fnName as unknown as keyof typeof option] = (...args) => {
            /*@ts-ignore*/
            return fn?.(...args);
          };
      }
    });
    // 内置信息
    option.extendData = {
      ...defaultOverlayExtendData,
      text: "string"
    };
    return option as OverlayCreate;
  };
  const wrapperOverlayCreator = arrifyOverlay(overlayCreator).map(wrapperOverlayFunction);
  const overlayIds: string[] = klineChartInstance.chart.createOverlay(wrapperOverlayCreator, paneId) as string[];
  // 创建覆层
  klineChartInstance.emitter.emit("overlay:create", getOverlayByIds(overlayIds));
  // 获取
  return overlayIds;
};
const removeOverlay: ICommands["removeOverlay"] = (...args) => {
  const overlayIds = arrifyOverlay(args[0]);
  // 移除覆层
  /*@ts-ignore*/
  klineChartInstance.emitter.emit("overlay:removed", getOverlayByIds(overlayIds));
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

const commands: ICommands = {
  createOverlay,
  removeOverlay,
  getOverlayByIds
};


export function executeCommand<T extends keyof ICommands>
(type: T, ...args: Parameters<ICommands[T]>): ReturnType<ICommands[T]> {
  klineChartInstance
    .emitter
    .emit("setup:command",
      {
        type,
        args
      });
  /*@ts-ignore*/
  return commands[type as keyof Commands](...args);
}
