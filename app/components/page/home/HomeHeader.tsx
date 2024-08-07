import {
  ActionIcon,
  AppShell,
  Group,
  Text,
  useMantineColorScheme
} from "@mantine/core";
import { NEXT_PUBLIC_CHART_WEBSITE_NAME } from "@/config";

export function HomeHeader() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <>
      <AppShell.Header px={16}>
        <AppShell.Section
          className={"flex h-full items-center justify-between"}
        >
          <Group>
            <Text
              size="xl"
              fw={700}
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
              component="button"
            >
              {NEXT_PUBLIC_CHART_WEBSITE_NAME}
            </Text>
          </Group>
          <Group>
            <ActionIcon variant={"outline"} onClick={() => toggleColorScheme()}>
              {colorScheme === "dark" ? (
                <i className={"i-material-symbols-light-sunny"} />
              ) : (
                <i className={"i-material-symbols-light-shield-moon"} />
              )}
            </ActionIcon>
          </Group>
        </AppShell.Section>
      </AppShell.Header>
    </>
  );
}
