import { ActionIcon, Menu } from "@mantine/core";
import { cx } from "@emotion/css";

export default function FloatingMenu() {
  return (
    <div
      className={cx(
        `fixed bottom-[24px] left-[50%] z-10 flex translate-x-[-50%] flex-col justify-center rounded-[48px] bg-[#34495e] bg-opacity-2 px-[16px] py-[12px] drop-shadow-lg backdrop-blur-[12px]`
      )}
    >
      <div
        className={`flex items-center justify-center gap-[12px] border-none`}
      >
        <Menu withArrow>
          <Menu.Target>
            <ActionIcon variant={"transparent"} radius={"full"}>
              <i className={"i-mdi-cursor-pointer"}></i>
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>添加文本标记</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <ActionIcon component={"button"} variant={"transparent"}>
          <i className={"i-mdi-settings"} />
        </ActionIcon>
      </div>
    </div>
  );
}
