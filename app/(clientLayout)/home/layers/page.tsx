"use client";
import { KlineChartModule } from "@/app/components/KlineCharts/core";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useForceUpdate } from "@mantine/hooks";
import {
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

const klineChartModule = KlineChartModule();
const OverlayController = (props: {
  overlay: WrappedOverlay;
  index: number;
}) => {
  const unwrappedOverlay = unwrapAttributes(props.overlay);
  const { updateSelected, selectedLayerIds } = useContext(LayersContext);

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
      <div className={"flex w-full items-center gap-[4px]"}>
        <Text className={"w-full"} truncate>
          {unwrappedOverlay.attributes.label}
        </Text>
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
  }, [selectedLayer?.[0].id]);
  if (!selectedLayer?.length) return null;
  const label = register("label");
  const handleUpdate = (value: string) => {
    updateDrawStore((prev) => {
      selectedLayer.forEach((layer) => {
        layer.attributes.label = value ?? "";
        console.log(layer.id);
        prev.set(layer.id, layer);
      });
      return prev;
    });
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
  const update = useForceUpdate();
  const [layerState] = useState(drawStore());
  klineChartModule.useCommand("overlay:create", update);

  return (
    <>
      <AppShell.Section>
        <ul className={"flex h-[400px] w-full select-none flex-col"}>
          {[...layerState.keys()].map((overlayId, index) => {
            const overlay = layerState.get(overlayId)!;
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

const LayersContext = createContext<{
  selectedLayer?: WrappedOverlay[];
  updateSelected?: (overlay: WrappedOverlay[]) => void;
  selectedLayerIds?: string[];
}>({});

const LayersProvider = LayersContext.Provider;

export default function Layers() {
  const [selectedLayer, updateSelected] = useState<WrappedOverlay[]>([]);
  const selectedLayerIds = useMemo(() => {
    return selectedLayer?.map((layer) => layer.id!) ?? ([] as string[]);
  }, [selectedLayer]);
  return (
    <LayersProvider
      value={{
        selectedLayer,
        selectedLayerIds: selectedLayerIds!,
        updateSelected
      }}
    >
      <div className={"relative flex-col"}>
        <LayerList />
        <AttributePanel />
      </div>
    </LayersProvider>
  );
}
