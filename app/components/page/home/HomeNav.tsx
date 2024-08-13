"use client";
import "react-data-grid/lib/styles.css";
import { AppShell, Avatar, rem } from "@mantine/core";
import useBreakpoints, { MediaType } from "@/app/hooks/use-breakpoints";

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
          {/*<AppShell.Section grow component={ScrollArea}>*/}
          {/*  /!*{RenderRightTools(rightTools)}*!/*/}
          {/*</AppShell.Section>*/}
          <AppShell.Section className={"flex-col items-center"}>
            <Avatar component="button">A</Avatar>
          </AppShell.Section>
        </AppShell.Navbar>
      ) : null}
    </>
  );
}
