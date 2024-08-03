"use client";
import type { ReactNode } from "react";
import SwrInitor from "@/app/components/swr-initor";
import { EventEmitterContextProvider } from "@/app/context/event-emitter";
import { MantineProvider } from "@/app/context/mantine-context";
import "react-toastify/dist/ReactToastify.css";
import { AppShell, Flex, ThemeIcon } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import { cx } from "@emotion/css";
import useBreakpoints, { MediaType } from "@/app/hooks/use-breakpoints";

interface ToolOption {
  icon: string;
  label: string;
  key: string;
}
export default function ({ children }: { children: ReactNode }) {
  const rightTools: ToolOption[] = [
    {
      label: "添加文本",
      icon: "i-material-symbols-light-text-fields ",
      key: "add-text"
    }
  ];
  const mediaType = useBreakpoints();
  return (
    <>
      <SwrInitor>
        <MantineProvider>
          <EventEmitterContextProvider>
            <AppShell
              navbar={{
                width: {
                  base: 60
                },
                breakpoint: "md"
              }}
              header={{
                height: { base: 60, sm: 48 }
              }}
            >
              {mediaType !== MediaType.mobile ? (
                <AppShell.Navbar
                  p="md"
                  className={"overflow-hidden"}
                  zIndex={2}
                >
                  <AppShell.Section>
                    {rightTools.map((item) => {
                      return (
                        <ThemeIcon
                          variant="gradient"
                          size="md"
                          gradient={{ from: "orange", to: "red", deg: 282 }}
                          radius={"sm"}
                          className={cx("cursor-pointer")}
                          key={item.key}
                        >
                          <i className={cx(item.icon)}></i>
                        </ThemeIcon>
                      );
                    })}
                  </AppShell.Section>
                </AppShell.Navbar>
              ) : null}

              <AppShell.Header
                className={"flex items-center justify-end px-[10px]"}
                zIndex={100}
              >
                <Flex
                  gap={"12px"}
                  h={"full"}
                  direction={"row"}
                  align={"center"}
                  justify={"end"}
                >
                  <ThemeIcon className={"cursor-pointer"} radius="xl">
                    <i className={"i-mdi-settings"}></i>
                  </ThemeIcon>
                </Flex>
              </AppShell.Header>
              <AppShell.Main h={"100vh"}>
                {children}
                <ToastContainer
                  position="top-center"
                  newestOnTop={true}
                  progressClassName={cx("hidden")}
                  theme={"dark"}
                  closeButton={false}
                  autoClose={1000}
                  containerId={"global"}
                  hideProgressBar={true}
                  className={cx(
                    `[--toastify-color-dark:#2F403A] [--toastify-color-progress-bgo:0] [--toastify-toast-min-height:initial] [--toastify-toast-width:auto]`
                  )}
                />
              </AppShell.Main>

              <AppShell.Aside w={48} p="md"></AppShell.Aside>
              {mediaType === MediaType.mobile ? (
                <AppShell.Footer px={60} p="md">
                  <AppShell.Section>Footer</AppShell.Section>
                </AppShell.Footer>
              ) : null}
            </AppShell>
          </EventEmitterContextProvider>
        </MantineProvider>
      </SwrInitor>
    </>
  );
}
