"use client";
import { KlineChartModule, LifeCycle } from "@/app/components/KlineCharts/core";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDisclosure, useForceUpdate } from "@mantine/hooks";
import {
  ActionIcon,
  AppShell,
  Divider,
  Fieldset,
  Stack,
  Text,
  TextInput
} from "@mantine/core";
import type { WrappedOverlay } from "@/app/components/KlineCharts/types";
import { cx } from "@emotion/css";
import { useForm } from "react-hook-form";
import {
  drawStore,
  updateDrawStore
} from "@/app/components/KlineCharts/stateFn/store";
import { unwrapAttributes } from "@/app/components/KlineCharts/utils/unwrapAttributes";

const LayersContext = createContext<{
  selectedLayer?: WrappedOverlay[];
  updateSelected?: (overlay: WrappedOverlay[]) => void;
  selectedLayerIds?: string[];
  layerState?: Map<WrappedOverlay["id"], WrappedOverlay>;
  updateLayerState?: () => void;
}>({});

const LayersProvider = LayersContext.Provider;
const klineChartModule = KlineChartModule();
const OverlayController = (props: {
  overlay: WrappedOverlay;
  index: number;
}) => {
  const unwrappedOverlay = unwrapAttributes(props.overlay);
  const { updateSelected, selectedLayerIds, updateLayerState } =
    useContext(LayersContext);

  const [visible, { toggle: toggleVisible }] = useDisclosure(
    unwrappedOverlay.attributes.visible
  );

  return (
    <li
      className={cx(
        "flex w-full cursor-pointer justify-between py-[4px] pr-[12px] [&.active]:bg-black",
        { active: selectedLayerIds?.includes(props.overlay.id!) }
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

        <i className={"i-mdi-close absolute right-0"}></i>
      </div>
    </li>
  );
};
const AttributePanel = () => {
  const { selectedLayer } = useContext(LayersContext);
  const { register, reset } = useForm<{
    label: string;
  }>({
    defaultValues: {
      label: selectedLayer?.[0]?.attributes?.label ?? ""
    }
  });
  useEffect(() => {
    return reset;
  }, [selectedLayer?.[0]?.id]);
  if (!selectedLayer?.length) return null;
  const label = register("label");
  const handleUpdate = (value: string) => {
    selectedLayer.forEach((layer) => {
      layer.attributes.label = value ?? "";
    });
    updateDrawStore(selectedLayer);
  };
  return (
    <div
      className={`fixed bottom-0 m-0 flex h-[400px] w-full shrink-0 flex-col gap-[6px]`}
    >
      <Divider w={"100%"} />
      {selectedLayer!.map((item) => item.id)}
      <Fieldset w={"100%"} variant="unstyled">
        <Stack>
          <TextInput
            {...label}
            onChange={(e) => {
              handleUpdate(e.target.value);
              label.onChange(e);
            }}
            placeholder="显示文本"
          />
          <TextInput placeholder="标记信息" />
        </Stack>
      </Fieldset>
    </div>
  );
};

function LayerList() {
  const { layerState } = useContext(LayersContext);
  return (
    <>
      <AppShell.Section className={"w-full"}>
        <ul className={"flex h-[400px] w-full select-none flex-col"}>
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
        </ul>
      </AppShell.Section>
    </>
  );
}

export default function Layers() {
  const update = useForceUpdate();
  const [selectedLayer, updateSelected] = useState<WrappedOverlay[]>([]);
  const [layerState] = useState(drawStore());
  const selectedLayerIds = useMemo(
    () => selectedLayer?.map((layer) => layer.id!) ?? ([] as string[]),
    [selectedLayer]
  );

  klineChartModule.useCommand(`overlay:${LifeCycle.onDrawStart}`, update);
  klineChartModule.useCommand(`overlay:${LifeCycle.onRemoved}`, update);

  return (
    <LayersProvider
      value={{
        selectedLayer,
        selectedLayerIds: selectedLayerIds!,
        updateSelected,
        layerState,
        updateLayerState: update
      }}
    >
      <div className={"relative flex-col"}>
        <LayerList />
        <AttributePanel />
      </div>
    </LayersProvider>
  );
}
