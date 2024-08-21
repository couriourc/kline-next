import {
  Badge,
  Button,
  Group,
  Modal,
  TextInput,
  UnstyledButton
} from "@mantine/core";
import { atom } from "jotai/index";
import { useAtom, useSetAtom } from "jotai";
import { useForm } from "@mantine/form";
import { useCallback } from "react";
import { atomWithStorage } from "jotai/utils";

export const LabelsAtom = atomWithStorage<LabelInfo[]>("labels", []);
export const LabelManagerModalAtom = atom<{
  open: boolean;
}>({
  open: false
});

export function LabelManagerModel() {
  const [{ open }, updateLabelManagerModalAtom] = useAtom(
    LabelManagerModalAtom
  );
  const handleToggle = (state: boolean) => {
    updateLabelManagerModalAtom((prev) => ({ ...prev, open: state }));
  };
  return (
    <>
      <Modal
        centered
        opened={open}
        onClose={() => {
          handleToggle(false);
        }}
        title="标签管理"
      >
        <LabelTable></LabelTable>
      </Modal>

      <UnstyledButton>
        <Badge
          className={"cursor-pointer!"}
          variant={"outline"}
          onClick={() => handleToggle(true)}
          size={"sm"}
        >
          添加标签+
        </Badge>
      </UnstyledButton>
    </>
  );
}

export interface LabelInfo {
  labelDisplayName: string;
  labelData: string;
  tagName: string;
}

function LabelTable() {
  const updateLabels = useSetAtom(LabelsAtom);
  const form = useForm<LabelInfo>({
    mode: "uncontrolled",
    initialValues: {
      tagName: "",
      labelDisplayName: "",
      labelData: ""
    }
  });
  const handleSubmit = useCallback((e: LabelInfo) => {
    updateLabels((state) => [...(state ?? []), e]);
  }, []);
  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput
        withAsterisk
        label="标签名"
        placeholder="标签名"
        key={form.key("tagName")}
        {...form.getInputProps("tagName")}
      />
      <TextInput
        withAsterisk
        label="标记名"
        placeholder="标记名"
        key={form.key("labelDisplayName")}
        {...form.getInputProps("labelDisplayName")}
      />
      <TextInput
        withAsterisk
        label="标签信息"
        placeholder="标签信息"
        key={form.key("labelData")}
        {...form.getInputProps("labelData")}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">确认</Button>
      </Group>
    </form>
  );
}
