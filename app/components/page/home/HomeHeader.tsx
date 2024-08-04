import {
  ActionIcon,
  Avatar,
  Group,
  Input,
  Kbd,
  useMantineColorScheme
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useRef } from "react";

export function HomeHeader() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useHotkeys(
    [
      [
        "ctrl+k",
        (ev) => {
          // 聚焦搜索
          console.log(inputRef.current);
          inputRef.current?.focus();
          ev.preventDefault();
        }
      ]
    ],
    undefined
  );
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <>
      <Group>
        <Avatar>A</Avatar>
      </Group>
      <Group>
        <Input
          ref={inputRef}
          leftSection={<i className={"i-mdi-search"} />}
          rightSectionWidth={60}
          rightSection={
            <>
              <Kbd size={"sm"}>⌘+k</Kbd>
            </>
          }
        />
        <ActionIcon variant={"outline"} onClick={() => toggleColorScheme()}>
          {colorScheme === "dark" ? (
            <i className={"i-material-symbols-light-sunny"} />
          ) : (
            <i className={"i-material-symbols-light-shield-moon"} />
          )}
        </ActionIcon>
      </Group>
    </>
  );
}
