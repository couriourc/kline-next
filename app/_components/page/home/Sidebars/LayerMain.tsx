"use client";
import { createContext, useEffect, useMemo } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  ActionIcon,
  Badge,
  Button,
  Divider,
  Fieldset,
  Flex,
  Group,
  rem,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  UnstyledButton
} from "@mantine/core";
import type { WrappedOverlay } from "@components/KlineCharts/types";
import { cx } from "@emotion/css";
import { useForm } from "react-hook-form";
import {
  ChartStoreAtom,
  updateDrawStore
} from "@components/KlineCharts/stateFn/store";
import { unwrapAttributes } from "@components/KlineCharts/utils/unwrapAttributes";
import { atom, useSetAtom } from "jotai";
import { executeCommand } from "@lib/hooks/use-event-emitter";
import { selectAtom } from "jotai/utils";
import { useAtomValue } from "jotai/index";
import {
  type LabelInfo,
  LabelManagerModel,
  LabelsAtom
} from "@components/modals/label-manager";

export const selectedLayerIdsAtom = selectAtom(
  ChartStoreAtom,
  (chartStore) => chartStore.selectedOverlayIds
);
export const selectedLayerAtom = atom(
  (get) => {
    const selectedIds = get(selectedLayerIdsAtom);
    const overlayCollection = get(overlayCollectionAtom);
    return selectedIds.map((id) => overlayCollection.get(id)!);
  },
  (_get, set, args: WrappedOverlay[]) => {
    set(ChartStoreAtom, (prev) => ({
      ...prev,
      selectedOverlayIds: args.map((overlay) => overlay.id)
    }));
  }
);
export const overlayCollectionAtom = selectAtom(
  ChartStoreAtom,
  (chartStore) => chartStore.overlays
);

const LayersContext = createContext<{
  selectedLayer?: WrappedOverlay[];
  updateSelected?: (
    overlay: WrappedOverlay[] | ((pre: WrappedOverlay[]) => any)
  ) => void;
  selectedLayerIds?: string[];
  layerState?: Map<WrappedOverlay["id"], WrappedOverlay>;
  updateLayerState?: () => void;
}>({});

const LayersProvider = LayersContext.Provider;
const OverlayController = (props: {
  overlay: WrappedOverlay;
  index: number;
}) => {
  const unwrappedOverlay = unwrapAttributes(props.overlay);
  const updateSelected = useSetAtom(selectedLayerAtom);
  const selectedLayerIds = useAtomValue(selectedLayerIdsAtom);

  const [visible, { toggle: toggleVisible }] = useDisclosure(
    unwrappedOverlay.attributes.visible
  );

  const isSelected = useMemo(
    () => selectedLayerIds?.includes(props.overlay.id!),
    [selectedLayerIds]
  );

  return (
    <li
      className={cx(
        "flex w-full cursor-pointer justify-between py-[4px] pr-[12px] [&.active]:bg-black",
        { active: isSelected }
      )}
      onClick={() => {
        updateSelected?.([props.overlay]);
      }}
      key={props.overlay.id}
    >
      <div className={"relative flex w-full items-center gap-[4px]"}>
        {/*{JSON.stringify(unwrappedOverlay)}*/}
        <ActionIcon
          onClickCapture={() => {
            toggleVisible();
            unwrappedOverlay.attributes.visible =
              !unwrappedOverlay.attributes.visible;
            updateDrawStore([unwrappedOverlay]);
          }}
          variant={visible ? "transparent" : "outline"}
        >
          <i className={visible ? "i-mdi-eye" : "i-mdi-eye-off"} />
        </ActionIcon>

        <Text className={"w-full"} truncate>
          {unwrappedOverlay.attributes.label}
        </Text>

        <i
          className={"i-mdi-close absolute right-0 cursor-pointer"}
          onClickCapture={() => {
            if (isSelected) {
              updateSelected?.([]);
            }
            executeCommand("chart:overlay:cleanup", unwrappedOverlay);
          }}
        />
      </div>
    </li>
  );
};
const AttributePanel = () => {
  const selectedLayer = useAtomValue(selectedLayerAtom);
  const { register, reset, getValues, setValue } = useForm<LabelInfo>();
  useEffect(() => {
    reset({
      labelDisplayName: selectedLayer?.[0]?.attributes?.label!
    });
  }, [selectedLayer?.[0]?.id]);

  const labelDisplayName = register("labelDisplayName");
  const labelData = register("labelData");
  const labels = useAtomValue(LabelsAtom);
  const handleUpdate = (value: LabelInfo) => {
    selectedLayer.forEach((layer) => {
      layer.attributes.label = value.labelDisplayName;
    });
    updateDrawStore(selectedLayer);
  };

  if (!selectedLayer.length) return null;
  return (
    <div className={`absolute bottom-0 flex w-full shrink-0 flex-col`}>
      <Divider w={"100%"} />
      <div
        className={
          "m-0 flex h-[500px] flex-col gap-[6px] overflow-y-auto overflow-x-hidden px-[12px]"
        }
      >
        <Group justify={"space-between"}>
          <Text truncate>
            {selectedLayer!.map((item) => item.id).join(",")}
          </Text>
        </Group>
        <Fieldset w={"100%"} variant="unstyled">
          <Stack>
            <TextInput
              {...labelDisplayName}
              onChange={(e) => {
                labelDisplayName.onChange(e);
                handleUpdate(getValues());
              }}
              placeholder="显示文本"
            />
            <TextInput {...labelData} placeholder="标记信息" />
          </Stack>
        </Fieldset>
        <Flex wrap={"wrap"} gap={rem(12)}>
          {labels.map((labelInfo) => {
            return (
              <UnstyledButton key={labelInfo.labelDisplayName}>
                <Badge
                  onClick={() => {
                    handleUpdate(labelInfo);
                    Object.keys(labelInfo).forEach((key) => {
                      setValue(
                        key as keyof LabelInfo,
                        labelInfo[key as keyof LabelInfo]
                      );
                    });
                  }}
                >
                  {labelInfo.tagName}
                </Badge>
              </UnstyledButton>
            );
          })}
          <LabelManagerModel />
        </Flex>
      </div>
    </div>
  );
};

function LayerList() {
  const layerState = useAtomValue(overlayCollectionAtom);
  if (!layerState?.size)
    return (
      <Button
        size={"xs"}
        my={rem(60)}
        mx={"auto"}
        onClick={() =>
          executeCommand("chart:overlay:creator", {
            params: {
              search: "",
              command: "textInput"
            }
          })
        }
      >
        添加文本标记
      </Button>
    );
  return (
    <>
      <ScrollArea
        component={"ul"}
        className={
          "flex h-[900px] w-full select-none flex-col overflow-y-auto overflow-x-hidden"
        }
      >
        {[...layerState!.keys()].map((overlayId, index) => {
          const overlay = layerState!.get(overlayId)!;
          return (
            <OverlayController
              key={overlayId}
              overlay={overlay}
              index={index}
            />
          );
        })}
      </ScrollArea>
    </>
  );
}

export default function LayerMain() {
  return (
    <div className={"relative flex h-full w-full flex-col items-center"}>
      <LayerList />
      <AttributePanel />
    </div>
  );
}
