"use client";
import type { ReactNode } from "react";
import SwrInitor from "@/app/components/swr-initor";
import { MantineProvider } from "@/app/context/mantine-context";
import "react-toastify/dist/ReactToastify.css";
import { AppShell, rem } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import { cx } from "@emotion/css";
import useBreakpoints, { MediaType } from "@/app/hooks/use-breakpoints";
import { useDisclosure } from "@mantine/hooks";
import { HomeHeader } from "@/app/components/page/home/HomeHeader";
import HomeNav from "@/app/components/page/home/HomeNav";
import CommandInitor from "@/app/components/command-initor";

export default function ({ children }: { children: ReactNode }) {
  const mediaType = useBreakpoints();
  const [opened] = useDisclosure();
  return (
    <>
      <SwrInitor>
        <MantineProvider>
          <CommandInitor>
            <AppShell
              layout="alt"
              navbar={{
                width: {
                  base: rem(60)
                },
                breakpoint: "md",
                collapsed: { mobile: !opened }
              }}
              header={{
                height: {
                  base: rem(48)
                }
              }}
            >
              <HomeHeader />
              <HomeNav />

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

              {mediaType === MediaType.mobile ? (
                <AppShell.Footer px={60} p="md">
                  <AppShell.Section>Footer</AppShell.Section>
                </AppShell.Footer>
              ) : null}
            </AppShell>
          </CommandInitor>
        </MantineProvider>
      </SwrInitor>
    </>
  );
}
