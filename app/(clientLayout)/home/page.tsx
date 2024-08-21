"use client";
import "react-data-grid/lib/styles.css";
import {
  Flex,
  Group,
  Loader,
  Menu,
  Tabs,
  Text,
  TextInput,
  UnstyledButton
} from "@mantine/core";
import DatasourceMain from "@components/page/home/Sidebars/DatasourceMain";
import { useAtom, useAtomValue } from "jotai/index";
import { plateListAtom } from "@lib/store/userPlateStore";
import {
  curSelectedPlateAtom,
  mutationUserCustomPlateA
} from "@lib/store/chartStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { cx } from "@emotion/css";
import LayerMain, {
  selectedLayerAtom
} from "@components/page/home/Sidebars/LayerMain";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCommand } from "@lib/hooks/use-event-emitter";
import { LifeCycle } from "@components/KlineCharts/core";
import { useSetAtom } from "jotai";
import type { WrappedOverlay } from "@components/KlineCharts/types";

export enum SideEnum {
  SelfSelectedGroupListLayout = "SelfSelectedGroupListLayout",
  LabelLayout = "LabelLayout"
}

function AsideMenus() {
  // 用户-自定义板块 列表 数据
  const { data: plateList, isLoading, refetch } = useAtomValue(plateListAtom);
  const [currentPlate, updateCurrentPlate] = useAtom(curSelectedPlateAtom);
  const [searchValue, updateSearchValue] = useState("");

  const { mutate: handleUserCustomPlateA, isPending } = useAtomValue(
    mutationUserCustomPlateA
  );
  const handleUpdate = useCallback(updateCurrentPlate, [updateCurrentPlate]);

  const list = useMemo(() => {
    if (!plateList) return [];
    const _list = plateList.content;
    handleUpdate(_list[0]);
    return _list ?? [];
  }, [isLoading]);

  const fuse = useMemo(
    () =>
      new Fuse(list, {
        includeScore: true,
        useExtendedSearch: true,
        keys: ["plate_name"]
      }),
    [isLoading]
  );
  const filteredItems = useMemo(() => {
    if (!searchValue?.trim().length) return list;

    return fuse.search(searchValue).map(({ item }) => item);
  }, [isLoading, searchValue]);

  const reset = () => {
    updateSearchValue("");
    refetch();
  };

  useEffect(() => {
    reset();
  }, [isPending]);
  return (
    <UnstyledButton className={"flex items-center"}>
      <Menu closeOnItemClick={false}>
        <Menu.Target>
          <i className="i-[material-symbols-light--expand-circle-down-outline]"></i>
        </Menu.Target>
        <Menu.Dropdown px={"xs"}>
          <Menu.Item className={"!w-[200px] truncate"} p={"5px"}>
            <TextInput
              onChange={(ev) => {
                updateSearchValue(ev.target.value);
              }}
              size={"xs"}
              rightSection={
                isPending ? (
                  <Loader size={"xs"}></Loader>
                ) : (
                  <i
                    className={"i-mdi-add"}
                    onClick={() => {
                      handleUserCustomPlateA({
                        plate_name: searchValue,
                        plate_code: ""
                      });
                    }}
                  />
                )
              }
              placeholder={"搜索或添加分组"}
            ></TextInput>
          </Menu.Item>
          <div className={"h-[200px] overflow-y-auto overflow-x-hidden"}>
            {filteredItems.length ? (
              (filteredItems.map((plate, index) => (
                <Menu.Item
                  className={cx(
                    `!w-[200px] truncate hover:bg-[var(--mantine-default-hover)] [&_.active]:bg-[var(--mantine-default-hover)]`,
                    {
                      active: plate.plate_id === currentPlate?.plate_id
                    }
                  )}
                  p={"5px"}
                  key={plate.plate_id + index}
                  onClick={() => {
                    handleUpdate(plate);
                  }}
                >
                  <Text size={"xs"} className={""}>
                    {plate.plate_name}
                  </Text>
                </Menu.Item>
              )) ?? [])
            ) : (
              <Menu.Item
                p={"5px"}
                onClick={() => {
                  handleUserCustomPlateA({
                    plate_name: searchValue,
                    plate_code: ""
                  });
                }}
                className={"flex items-center"}
              >
                <Text size={"xs"}>新增‘{searchValue}’</Text>
              </Menu.Item>
            )}
          </div>
        </Menu.Dropdown>
      </Menu>

      <Text truncate size={"sm"}>
        {currentPlate?.plate_name}
      </Text>
    </UnstyledButton>
  );
}

function AsideHeader() {
  return (
    <Group justify={"space-between"} className={"box-border"}>
      <Group>
        <AsideMenus />
      </Group>
    </Group>
  );
}

export default function Datasource() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<SideEnum>(
    (searchParams.get("tab") as SideEnum) ??
      SideEnum.SelfSelectedGroupListLayout
  );

  const handleReplaceLayout = useCallback(
    (key: SideEnum) => {
      setTab(key);
      router.replace(`${pathname}?tab=${key}`);
    },
    [pathname, tab]
  );
  const tabs = useMemo(
    () => [
      {
        title: <AsideHeader />,
        key: SideEnum.SelfSelectedGroupListLayout,
        panel: <DatasourceMain />
      },
      {
        title: <Text size={"sm"}>标记信息</Text>,
        key: SideEnum.LabelLayout,
        panel: <LayerMain />
      }
    ],
    [pathname, tab]
  );

  const updateSelectedLayerAtom = useSetAtom(selectedLayerAtom);

  useCommand(`chart:overlay:${LifeCycle.onDoubleClick}`, (info) => {
    handleReplaceLayout(SideEnum.LabelLayout);
    updateSelectedLayerAtom([info.overlay.extendData] as WrappedOverlay[]);
  });
  useCommand("chart:overlay:onDrawEnd", (info) => {
    handleReplaceLayout(SideEnum.LabelLayout);
    updateSelectedLayerAtom([info.overlay.extendData] as WrappedOverlay[]);
  });

  return (
    <Flex
      w={"100%"}
      p={"4px"}
      className={"h-full"}
      direction={"column"}
      gap={6}
    >
      <Tabs
        className={"h-full"}
        defaultValue={tab}
        variant={"outline"}
        onChange={(key) => {
          handleReplaceLayout(key as SideEnum);
        }}
        value={tab}
      >
        <Tabs.List>
          {tabs.map((tab, index) => (
            <Tabs.Tab size={"xs"} value={tab.key} key={tab.key}>
              {tab.title}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {tabs.map((tab, index) => (
          <Tabs.Panel value={tab.key} key={tab.key}>
            {tab.panel}
          </Tabs.Panel>
        ))}
      </Tabs>
    </Flex>
  );
}
