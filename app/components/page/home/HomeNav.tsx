"use client";
import "react-data-grid/lib/styles.css";
import {
  AppShell,
  Avatar,
  Menu,
  rem,
  ScrollArea,
  ThemeIcon,
  Tooltip
} from "@mantine/core";
import useBreakpoints, { MediaType } from "@/app/hooks/use-breakpoints";
import { cx } from "@emotion/css";
import { rightTools } from "@/app/commands/homeNavTools";
import type { ExecutionMenuItem } from "@/app/components/ui/ContextMenu/types";

export default function HomeNav() {
  const mediaType = useBreakpoints();

  const RenderRightTools = (root: ExecutionMenuItem[]) => {
    return (
      <>
        {root.map((item) => {
          if (item.children?.length) {
            return (
              <Menu key={item.key}>
                <Menu.Target>
                  <Avatar component="button">{item.icon}</Avatar>
                  <span>{item.description}</span>
                </Menu.Target>
                <Menu.Dropdown></Menu.Dropdown>
              </Menu>
            );
          }
          return (
            <div
              key={item.key}
              className={`mb-[12px] flex w-full items-center justify-center`}
            >
              <Tooltip label={item.description}>
                <ThemeIcon
                  variant="outline"
                  radius={"sm"}
                  className={cx("mx-auto cursor-pointer")}
                  onClick={() => item.executor?.()}
                >
                  <i className={cx(item.icon)}></i>
                </ThemeIcon>
              </Tooltip>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      {mediaType !== MediaType.mobile ? (
        <AppShell.Navbar
          px={rem(8)}
          py="sm"
          className={"overflow-hidden"}
          zIndex={2}
        >
          <AppShell.Section grow component={ScrollArea}>
            {RenderRightTools(rightTools)}
          </AppShell.Section>
          <AppShell.Section>
            <Avatar component="button">A</Avatar>
          </AppShell.Section>
        </AppShell.Navbar>
      ) : null}
    </>
  );
}
