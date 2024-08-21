"use client";
import { useAtom } from "jotai";
import { curSelectedStockAtom } from "@lib/store/chartStore";
import { DataTable, type DataTableColumn } from "mantine-datatable";
import { useMemo } from "react";
import { cx } from "@emotion/css";
import { ActionIcon, Badge, Menu, Text } from "@mantine/core";

import { plateListRelAtom } from "@lib/store/userPlateStore";
import { QuoteEmpty } from "@components/ui/Empty";
import Loading from "@components/base/loading";

interface StockListRow {
  stock_code: string;
  code_type: string;
  exchange: string;
  short_name: string;
}
// 侧边下拉菜单

export default function DatasourceMain() {
  const [{ data, isLoading }] = useAtom(plateListRelAtom);
  const [currentStock, updateCurSelectedStockAtom] =
    useAtom(curSelectedStockAtom);

  const columns: DataTableColumn<StockListRow>[] = [
    {
      accessor: "stock_code",
      title: "股票代码",
      render(row) {
        return (
          <Text
            onClickCapture={() => {
              updateCurSelectedStockAtom(() => row.stock_code);
            }}
            c="blue"
          >
            <span
              className={cx("cursor-pointer", {
                underline: currentStock === row.stock_code
              })}
            >
              {row.stock_code}
            </span>
          </Text>
        );
      }
    },
    {
      accessor: "code_type",
      title: "类型",
      render(row) {
        return <Badge>{row.code_type}</Badge>;
      }
    },
    {
      accessor: "exchange",
      title: "交易所"
    },
    { accessor: "short_name", title: "名称", resizable: true },
    {
      accessor: "control",
      title: "操作",
      resizable: true,
      render() {
        return (
          <Menu shadow="md" trigger={"hover"}>
            <Menu.Target>
              <ActionIcon
                aria-label="menu"
                variant={"transparent"}
                component={"button"}
                draggable
              >
                <i className={"i-mdi-menu"} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<i className={"i-mdi-add"} />}>
                <Text size={"sm"}>加入自选组</Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        );
      }
    }
  ];
  const rows = useMemo(() => {
    if (!data?.content) return [];
    return data.content;
  }, [data?.content, isLoading]);

  return (
    <>
      <div className={"h-full w-full grow"}>
        <DataTable<StockListRow>
          highlightOnHover
          striped
          minHeight={280}
          emptyState={isLoading ? <Loading type={"app"} /> : <QuoteEmpty />}
          records={rows}
          columns={columns}
          withColumnBorders
          idAccessor="stock_code"
          scrollAreaProps={{ type: "never" }}
          className={`!h-full grow !bg-[var(--mantine-color-body)] ![--rdg-background-color:var(--mantine-color-body)] ![--rdg-color:var(--mantine-color-text)] ![--rdg-header-background-color:var(--mantine-color-body)] ![--rdg-selection-color:var(--mantine-color-white-7)]`}
        />
      </div>
    </>
  );
}
