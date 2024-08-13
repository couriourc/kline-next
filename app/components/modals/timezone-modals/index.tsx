import { ActionIcon, Group, Modal, Space } from "@mantine/core";
import { atom, useAtom } from "jotai";
import { getOptions } from "./data";
import { OptionRender } from "@/app/components/modals/OptionRender";

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
            const Component = OptionRender(option);
            return <Space key={option.text}>{Component}</Space>;
          })}
        </Group>
      </Modal>
    </>
  );
}
