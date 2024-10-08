import { AppShell, Group, Text, UnstyledButton } from "@mantine/core";
import { NEXT_PUBLIC_CHART_WEBSITE_NAME } from "@/config";

export function HomeHeader() {
  return (
    <>
      <AppShell.Header px={16}>
        <AppShell.Section
          className={"flex h-full items-center justify-between"}
        >
          <Group>
            <UnstyledButton size={"sm"}>
              <Text
                size="xl"
                fw={700}
                variant="gradient"
                gradient={{ from: "blue", to: "cyan", deg: 90 }}
                component="button"
              >
                {NEXT_PUBLIC_CHART_WEBSITE_NAME}
              </Text>
            </UnstyledButton>
          </Group>
        </AppShell.Section>
      </AppShell.Header>
    </>
  );
}
