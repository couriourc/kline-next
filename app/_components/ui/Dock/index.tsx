import { ActionIcon, Menu, ThemeIcon, Tooltip } from "@mantine/core";
import { cx } from "@emotion/css";
import { SettingModal } from "@components/modals/setting-modals";
import { TimezoneModals } from "@components/modals/timezone-modals";
import type { ExecutionMenuItem } from "@components/ui/ContextMenu/types";
import { executeCommand } from "@lib/hooks/use-event-emitter";
import { CommandPosition } from "@lib/commands";
import {
  getCommandsByPosition,
  useSetupCommandsByPosition
} from "@lib/commands/register";

export default function FloatingMenu() {
  useSetupCommandsByPosition(CommandPosition.Docker);
  const dockerTools = getCommandsByPosition(CommandPosition.Docker);
  const RenderRightTools = (
    root: ExecutionMenuItem[],
    parent?: ExecutionMenuItem
  ) => {
    return (
      <>
        {root
          .filter((item) => !item.hidden)
          .filter((item) => !item.disabled)
          .map((item) => {
            return (
              <Menu.Item
                key={item.key}
                className={`mb-[12px] flex w-full items-center justify-center`}
              >
                <Tooltip label={item.description}>
                  <ThemeIcon
                    variant="outline"
                    radius={"sm"}
                    className={cx("mx-auto cursor-pointer")}
                    onClick={() => {
                      item.executor?.();
                      parent?.onChildExecute?.(item);
                    }}
                  >
                    <i className={cx(item.icon)}></i>
                  </ThemeIcon>
                </Tooltip>
              </Menu.Item>
            );
          })}
      </>
    );
  };

  return (
    <div
      className={cx(
        `fixed bottom-[24px] left-[50%] z-10 flex translate-x-[-50%] flex-col justify-center rounded-[48px] bg-[#34495e] bg-opacity-2 px-[16px] py-[12px] drop-shadow-lg backdrop-blur-[12px]`
      )}
    >
      <div
        className={`flex items-center justify-center gap-[12px] border-none`}
      >
        {dockerTools.map((tools) => {
          return (
            <Menu key={tools.key} withArrow>
              <Menu.Target>
                <ActionIcon
                  variant={"transparent"}
                  radius={"full"}
                  onClickCapture={() => tools.executor?.()}
                >
                  <i className={tools.icon}></i>
                </ActionIcon>
              </Menu.Target>
              {tools.children?.length ? (
                <Menu.Dropdown>
                  {RenderRightTools(tools.children!, tools)}
                </Menu.Dropdown>
              ) : null}
            </Menu>
          );
        })}

        <ActionIcon
          onClick={() => executeCommand("chart:overlay:cleanup")}
          variant={"transparent"}
        >
          <i className={"i-mdi-trash"}></i>
        </ActionIcon>
        <TimezoneModals />
        <SettingModal />
      </div>
    </div>
  );
}
