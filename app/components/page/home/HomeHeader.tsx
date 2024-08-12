import {
  ActionIcon,
  AppShell,
  Group,
  Text,
  UnstyledButton
} from "@mantine/core";
import { NEXT_PUBLIC_CHART_WEBSITE_NAME } from "@/config";
import { useRouter } from "next/navigation";
import { PeriodBar } from "@/app/components/page/home/components/PeriodBar";
import { SettingModal } from "@/app/components/modals/setting-modals";
import { TimezoneModals } from "@/app/components/modals/timezone-modals";

export function HomeHeader() {
  const router = useRouter();
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
            <PeriodBar />
          </Group>
          <Group>
            <SettingModal />
            <TimezoneModals />
            <ActionIcon
              variant={"outline"}
              onClick={() => router.push("/home/layers")}
            >
              <i className={"i-material-symbols-light-layers"} />
            </ActionIcon>
          </Group>
        </AppShell.Section>
      </AppShell.Header>
    </>
  );
}
