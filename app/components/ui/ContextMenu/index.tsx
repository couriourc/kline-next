import { ContextMenu, ContextMenuItem } from "rctx-contextmenu";
import "react-cmdk/dist/cmdk.css";
import {
  ActionIcon,
  Flex,
  Group,
  Input,
  List,
  ScrollArea,
  Text,
  Tooltip
} from "@mantine/core";
import { useCallback, useMemo, useRef, useState } from "react";
import { cx } from "@emotion/css";
import { useEventEmitterContextContext } from "@/app/context/event-emitter";

export enum ContextMenuEnum {
  CHART = "ContextMenuEnumCHART",
  TEMP = "TEMP"
}

export interface ExecutionMenuItem {
  label: string;
  command: string;
  isEqual: (
    item: string,
    raw: ExecutionMenuItem,
    paneId?: ContextMenuEnum
  ) => boolean;
}

const executionMenuList: ExecutionMenuItem[] = [
  {
    label: "添加到自选",
    command: "createSelfGroup",
    isEqual: (search, raw) => {
      return !raw.label.search(search);
    }
  },
  {
    label: "添加文本标记",
    command: "createTextOverlay",
    isEqual: () => true
  }
];

const ExecuteSearchContextMenu = ({ hidden }: { hidden: Function }) => {
  const { eventEmitter } = useEventEmitterContextContext();
  const [inputValue, updateInputValue] = useState("");
  const curSelectedItem = useRef<ExecutionMenuItem>();
  const [curSelectedItemIndex, updateCurSelectedItemIndex] =
    useState<number>(0);

  const filteredList = useMemo(() => {
    const commands = executionMenuList.filter((item) =>
      item.isEqual(inputValue, item, ContextMenuEnum.CHART)
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
        eventEmitter?.emit({
          command: "command:execute",
          payload: {
            ...curSelectedItem,
            inputValue
          }
        });
        hidden();

        break;
    }
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
                  eventEmitter?.emit({
                    command: "command:execute",
                    payload: item
                  });
                  hidden();
                }}
              >
                <Text size={"sm"}>{item.label}</Text>
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
        className={"!w-[400px] !bg-[var(--mantine-color-body)] !p-0"}
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
