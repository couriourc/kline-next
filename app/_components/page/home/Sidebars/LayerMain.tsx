"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDisclosure, useForceUpdate } from "@mantine/hooks";
import {
  ActionIcon,
  Badge,
  Button,
  Divider,
  Fieldset,
  rem,
  ScrollArea,
  Stack,
  Text,
  TextInput
} from "@mantine/core";
import type { WrappedOverlay } from "@components/KlineCharts/types";
import { cx } from "@emotion/css";
import { useForm } from "react-hook-form";
import {
  ChartStoreAtom,
  updateDrawStore
} from "@components/KlineCharts/stateFn/store";
import { unwrapAttributes } from "@components/KlineCharts/utils/unwrapAttributes";
import { useAtom } from "jotai";
import { executeCommand } from "@lib/hooks/use-event-emitter";

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
  const { updateSelected, selectedLayerIds } = useContext(LayersContext);

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
  const { selectedLayer } = useContext(LayersContext);
  const { register, reset } = useForm<{
    label: string;
  }>();
  useEffect(() => {
    reset({
      label: selectedLayer?.[0]?.attributes?.label!
    });
  }, [selectedLayer?.[0].id]);
  if (!selectedLayer?.length) return null;
  const label = register("label");
  const handleUpdate = (value: string) => {
    selectedLayer.forEach((layer) => {
      layer.attributes.label = value ?? "";
    });
    updateDrawStore(selectedLayer);
  };
  return (
    <div className={`absolute bottom-0 flex w-full shrink-0 flex-col`}>
      <Divider w={"100%"} />
      <div
        className={
          "m-0 flex h-[500px] flex-col gap-[6px] overflow-y-auto overflow-x-hidden px-[12px]"
        }
      >
        <Text truncate>{selectedLayer!.map((item) => item.id).join(",")}</Text>
        <Fieldset w={"100%"} variant="unstyled">
          <Stack>
            <TextInput
              {...label}
              onChange={(e) => {
                label.onChange(e);
                handleUpdate(e.target.value);
              }}
              placeholder="显示文本"
            />
            <TextInput placeholder="标记信息" />
          </Stack>
        </Fieldset>

        <div>
          <Badge>asd</Badge>
          <Badge>asd</Badge>
          <Badge>asd</Badge>
        </div>
      </div>
    </div>
  );
};

function LayerList() {
  const { layerState } = useContext(LayersContext);
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
  const update = useForceUpdate();
  const [selectedLayer, updateSelected] = useState<WrappedOverlay[]>([]);
  const selectedLayerIds = useMemo(
    () => selectedLayer?.map((layer) => layer.id!) ?? ([] as string[]),
    [selectedLayer]
  );

  const [{ overlays }] = useAtom(ChartStoreAtom);

  return (
    <LayersProvider
      value={{
        selectedLayer,
        selectedLayerIds: selectedLayerIds!,
        updateSelected,
        layerState: overlays,
        updateLayerState: update
      }}
    >
      <div className={"relative flex h-full w-full flex-col items-center"}>
        {overlays.size ? (
          <LayerList />
        ) : (
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
        )}
        {selectedLayer.length ? <AttributePanel /> : null}
      </div>
    </LayersProvider>
  );
}
