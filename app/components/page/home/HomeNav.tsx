"use client";
import "react-data-grid/lib/styles.css";
import {
  AppShell,
  Avatar,
  rem,
  ScrollArea,
  ThemeIcon,
  Tooltip
} from "@mantine/core";
import useBreakpoints, { MediaType } from "@/app/hooks/use-breakpoints";
import { Logo } from "@/app/components/ui/Logo";
import { cx } from "@emotion/css";
import type { ExecutionMenuItem } from "@/app/components/ui/ContextMenu/types";
import { executeCommand } from "@/app/hooks/use-event-emitter";

const rightTools: ExecutionMenuItem[] = [
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
  }
];
export default function HomeNav() {
  const mediaType = useBreakpoints();

  return (
    <>
      {mediaType !== MediaType.mobile ? (
        <AppShell.Navbar
          px={rem(8)}
          py="sm"
          className={"overflow-hidden"}
          zIndex={2}
        >
          <AppShell.Section
            className={"flex items-center justify-between"}
            mx={"auto"}
          >
            <div
              className={cx(
                `border-gray dark:text-blue mb-[12px] box-border flex size-[30px] items-center justify-center rounded-md border-[1px] border-solid p-[2px]`
              )}
            >
              <Logo />
            </div>
          </AppShell.Section>

          <AppShell.Section grow mx={"auto"} component={ScrollArea}>
            {rightTools.map((item) => {
              return (
                <Tooltip key={item.key} label={item.description}>
                  <ThemeIcon
                    variant="gradient"
                    gradient={{ from: "orange", to: "red", deg: 282 }}
                    radius={"sm"}
                    className={cx("cursor-pointer")}
                    onClick={() => item.executor?.()}
                  >
                    <i className={cx(item.icon)}></i>
                  </ThemeIcon>
                </Tooltip>
              );
            })}
          </AppShell.Section>
          <AppShell.Section>
            <Avatar component="button">A</Avatar>
          </AppShell.Section>
        </AppShell.Navbar>
      ) : null}
    </>
  );
}
