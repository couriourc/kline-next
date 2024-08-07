import { ContextMenu, ContextMenuItem } from "rctx-contextmenu";
import "react-cmdk/dist/cmdk.css";
import {
  ActionIcon,
  Flex,
  Group,
  Input,
  List,
  ScrollArea,
  Tooltip
} from "@mantine/core";
import { useCallback, useMemo, useRef, useState } from "react";
import { cx } from "@emotion/css";
import { executeCommand } from "@/app/hooks/use-event-emitter";
import _ from "underscore";
import { CommandEnum, ContextMenuEnum, type ExecutionMenuItem } from "./types";
import Handlebars from "handlebars";

/**
 * 快捷方式的权重计算
 * 满足 category
 * 满足 equal
 * */
const executionMenuList: ExecutionMenuItem[] = [
  {
    label: "搜索股票代码‘{{params.search}}’",
    command: "createSelfGroup",
    isEqual: (search) => {
      return !!search.length;
    },
    category: CommandEnum.TABLE
  },
  {
    label: "添加文本标记",
    command: "createTextOverlay",
    isEqual: () => true,
    category: CommandEnum.CHART,
    executor(args) {
      executeCommand("chart:command:creator", args);
    }
  }
];

const ExecuteSearchContextMenu = ({ hidden }: { hidden: Function }) => {
  const [inputValue, updateInputValue] = useState("");
  const curSelectedItem = useRef<ExecutionMenuItem>();
  const [curSelectedItemIndex, updateCurSelectedItemIndex] =
    useState<number>(0);

  const filteredList = useMemo(() => {
    const commands = executionMenuList.filter((item) =>
      item.isEqual?.(inputValue, item, ContextMenuEnum.CHART)
    )!;
    curSelectedItem.current = commands[0];
    return commands;
  }, [inputValue]);

  const handleUpdateCurSelectedItemIndex = useCallback(
    (index: number) => {
      const nextIdx =
        (curSelectedItemIndex + index + filteredList.length) %
        filteredList.length;
      updateCurSelectedItemIndex(() => nextIdx);
      curSelectedItem.current = filteredList[nextIdx];
    },
    [curSelectedItemIndex, filteredList, filteredList.length]
  );

  const handleCheckCommand = (item: ExecutionMenuItem) => {
    item?.executor?.({
      params: {
        search: inputValue,
        command: item.command
      }
    });
    hidden();
  };
  function handleExecuteInContextMenu(ev: React.KeyboardEvent<HTMLDivElement>) {
    switch (ev.code) {
      case "ArrowDown":
        handleUpdateCurSelectedItemIndex(1);
        break;
      case "ArrowUp":
        handleUpdateCurSelectedItemIndex(-1);
        break;
      case "Enter":
      case "NumpadEnter":
        handleCheckCommand(curSelectedItem.current!);
        break;
    }
  }
  function resolveLabel(item: ExecutionMenuItem) {
    if (!item.label) return item.label;
    if (!_.isString(item.label)) return item.label;
    return Handlebars.compile(item.label)({
      params: {
        search: inputValue
      }
    });
  }
  return (
    <Flex direction={"column"} gap={"12px"}>
      <Input
        autoFocus
        autoComplete={"off"}
        onChange={async (ev) => {
          updateCurSelectedItemIndex(0);
          updateInputValue(ev.target.value);
        }}
        placeholder={"请输入指令"}
        onKeyDownCapture={handleExecuteInContextMenu}
        size={"sm"}
        rightSection={<i className={"i-mdi-search"} />}
      />
      <Group gap={2}>
        <Tooltip label={"指令分类"}>
          <ActionIcon>
            <i className={"i-mdi-settings"}></i>
          </ActionIcon>
        </Tooltip>
        <Tooltip label={"指令分类"}>
          <ActionIcon>
            <i className={"i-mdi-gift"}></i>
          </ActionIcon>
        </Tooltip>
      </Group>
      <ScrollArea className={"w-full grow"} mah={400}>
        <List className={cx(`flex w-full flex-col gap-[6px]`)}>
          {filteredList.map((item) => {
            return (
              <List.Item
                p={"4px"}
                key={item.command}
                className={cx(
                  `w-full rounded-md text-[var(--mantine-color-text)] hover:bg-[var(--mantine-color-default-hover)] [&.active]:bg-[var(--mantine-color-default-hover)]`,
                  {
                    active: item.command === curSelectedItem.current?.command
                  }
                )}
                onClick={() => {
                  handleCheckCommand(item);
                }}
              >
                {resolveLabel(item)}
              </List.Item>
            );
          })}
        </List>
      </ScrollArea>
    </Flex>
  );
};

export function ContextMenus() {
  const [id, updateId] = useState(ContextMenuEnum.CHART);

  const hidden = () => {
    updateId(() => ContextMenuEnum.TEMP);
    setTimeout(() => {
      updateId(() => ContextMenuEnum.CHART);
    }, 0);
  };

  return (
    <>
      <ContextMenu
        id={id}
        className={"!max-w-[400px] !bg-[var(--mantine-color-body)] !p-0"}
      >
        <ContextMenuItem
          className={"!bg-transparent !p-[4px]"}
          preventClose={true}
        >
          <ExecuteSearchContextMenu hidden={hidden} />
        </ContextMenuItem>
      </ContextMenu>
    </>
  );
}
