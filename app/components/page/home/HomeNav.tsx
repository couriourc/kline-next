"use client";
import "react-data-grid/lib/styles.css";
import { AppShell, Group, ThemeIcon } from "@mantine/core";
import useBreakpoints, { MediaType } from "@/app/hooks/use-breakpoints";
import { Logo } from "@/app/components/ui/Logo";
import { cx } from "@emotion/css";

interface ToolOption {
  icon: string;
  label: string;
  key: string;
}

const rightTools: ToolOption[] = [
  {
    label: "添加文本",
    icon: "i-material-symbols-light-text-fields ",
    key: "add-text"
  }
];
export default function HomeNav() {
  const mediaType = useBreakpoints();

  return (
    <>
      {mediaType !== MediaType.mobile ? (
        <AppShell.Navbar
          px="md"
          py="sm"
          className={"overflow-hidden"}
          zIndex={2}
        >
          <AppShell.Section>
            <Group>
              <div
                className={
                  "border-gray box-border size-[30px] rounded-md border-[1px] border-solid p-[2px]"
                }
              >
                <Logo />
              </div>
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
            </Group>
          </AppShell.Section>
        </AppShell.Navbar>
      ) : null}
    </>
  );
}
