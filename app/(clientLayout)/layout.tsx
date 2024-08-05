"use client";
import type { ReactNode } from "react";
import SwrInitor from "@/app/components/swr-initor";
import { MantineProvider } from "@/app/context/mantine-context";
import "react-toastify/dist/ReactToastify.css";
import { AppShell } from "@mantine/core";
import { ToastContainer } from "react-toastify";
import { cx } from "@emotion/css";
import useBreakpoints, { MediaType } from "@/app/hooks/use-breakpoints";
import { useDisclosure } from "@mantine/hooks";
import { HomeHeader } from "@/app/components/page/home/HomeHeader";
import HomeNav from "@/app/components/page/home/HomeNav";

export default function ({ children }: { children: ReactNode }) {
  const mediaType = useBreakpoints();
  const [opened] = useDisclosure();
  return (
    <>
      <SwrInitor>
        <MantineProvider>
          <AppShell
            layout="alt"
            navbar={{
              width: {
                base: 60
              },
              breakpoint: "md",
              collapsed: { mobile: !opened }
            }}
            header={{
              height: {
                base: 56
              }
            }}
          >
            <AppShell.Header px={16}>
              <AppShell.Section
                className={"flex h-full items-center justify-between"}
              >
                <HomeHeader></HomeHeader>
              </AppShell.Section>
            </AppShell.Header>
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
        </MantineProvider>
      </SwrInitor>
    </>
  );
}
