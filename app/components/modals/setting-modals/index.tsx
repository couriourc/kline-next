import { atom, useAtom } from "jotai";
import { ActionIcon, Flex, Group, Modal, rem, Text } from "@mantine/core";
import { getOptions } from "@/app/components/modals/setting-modals/data";
import { FormOptionRenderer } from "@/app/components/schema-render/form-option-renderer";

export const SettingModalAtom = atom({
  open: false
});
export function SettingModal() {
  const [{ open }, updateSettingModal] = useAtom(SettingModalAtom);
  const options = getOptions();
  return (
    <>
      <ActionIcon
        variant={"transparent"}
        onClick={() => {
          updateSettingModal((state) => ({ ...state, open: true }));
        }}
      >
        <i className={"i-material-symbols-light-settings"} />
      </ActionIcon>

      <Modal
        opened={open}
        centered
        title={"设置"}
        transitionProps={{ transition: "fade", duration: 200 }}
        onClose={() => {
          updateSettingModal((state) => ({ ...state, open: false }));
        }}
      >
        <Group>
          {options.map((option) => {
            const Component = FormOptionRenderer(option);
            return (
              <Flex key={option.text} align={"center"}>
                <Text w={rem(120)}>{option.text}</Text>
                {Component}
              </Flex>
            );
          })}
        </Group>
      </Modal>
    </>
  );
}
