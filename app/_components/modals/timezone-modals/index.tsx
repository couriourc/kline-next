import { ActionIcon, Group, Modal, Space } from "@mantine/core";
import { atom, useAtom } from "jotai";
import { getOptions } from "./data";
import { FormOptionRenderer } from "@components/schema-render/form-option-renderer";

export const TimezoneModalAtom = atom({
  open: false
});
export function TimezoneModals() {
  const [{ open }, updateTimezoneModal] = useAtom(TimezoneModalAtom);
  const options = getOptions();
  return (
    <>
      <ActionIcon
        variant={"transparent"}
        onClick={() => {
          updateTimezoneModal((state) => ({ ...state, open: true }));
        }}
      >
        <i className={"i-[mdi--timer-sand-complete]"} />
      </ActionIcon>
      <Modal
        title={"选择时区"}
        onClose={() => {
          updateTimezoneModal((state) => ({ ...state, open: false }));
        }}
        opened={open}
        centered
      >
        <Group>
          {options.map((option) => {
            const Component = FormOptionRenderer(option);
            return <Space key={option.text}>{Component}</Space>;
          })}
        </Group>
      </Modal>
    </>
  );
}
