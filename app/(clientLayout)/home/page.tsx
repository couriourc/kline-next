"use client";
import "react-data-grid/lib/styles.css";
import {
  Flex,
  Group,
  Loader,
  Menu,
  rem,
  Tabs,
  Text,
  TextInput,
  UnstyledButton
} from "@mantine/core";
import DatasourceMain from "@/app/components/page/home/Sidebars/DatasourceMain";
import { useAtom, useAtomValue } from "jotai/index";
import { plateListAtom } from "@/app/store/userPlateStore";
import {
  curSelectedPlateAtom,
  mutationUserCustomPlateA
} from "@/app/store/chartStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { cx } from "@emotion/css";
import LayerMain from "@/app/components/page/home/Sidebars/LayerMain";

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
    <Menu closeOnItemClick={false}>
      <Menu.Target>
        <UnstyledButton className={"flex items-center"}>
          <span className="i-[material-symbols-light--expand-circle-down-outline]"></span>
          <Text truncate size={"sm"}>
            {currentPlate?.plate_name}
          </Text>
        </UnstyledButton>
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
  );
}

function AsideHeader() {
  //  const { mutate: download } =
  return (
    <Group justify={"space-between"} className={"box-border"}>
      <Group>
        <AsideMenus />
      </Group>
    </Group>
  );
}
export default function Datasource() {
  return (
    <Flex
      w={"100%"}
      p={"4px"}
      className={"h-full"}
      direction={"column"}
      gap={6}
    >
      <Tabs className={"h-full"} defaultValue="自选组列表">
        <Tabs.List>
          <Tabs.Tab value="自选组列表">
            <AsideHeader />
          </Tabs.Tab>
          <Tabs.Tab value="标记信息">标记信息</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel pt={rem(12)} value="自选组列表">
          <DatasourceMain />
        </Tabs.Panel>

        <Tabs.Panel className={"h-full"} pt={rem(12)} value="标记信息">
          <LayerMain />
        </Tabs.Panel>
      </Tabs>
    </Flex>
  );
}
