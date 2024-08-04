import { Avatar, Group, Input, Kbd } from "@mantine/core";
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
      </Group>
    </>
  );
}
