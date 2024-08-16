"use client";
import { useAtom } from "jotai";
import { curSelectedStockAtom } from "@lib/store/chartStore";
import DataGrid, {
  type Column,
  type Renderers,
  type RenderRowProps,
  Row
} from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { useMemo } from "react";
import { cx } from "@emotion/css";
import {
  ActionIcon,
  Badge,
  Blockquote,
  Flex,
  Loader,
  Menu,
  Text
} from "@mantine/core";
import type { DynamicProps } from "$types/misc";
import _ from "underscore";
import { plateListRelAtom } from "@lib/store/userPlateStore";

interface StockListRow {
  stock_code: string;
  code_type: string;
  exchange: string;
  short_name: string;
}
interface DraggableRowRenderProps<R, SR> extends RenderRowProps<R, SR> {
  onRowReorder: (sourceIndex: number, targetIndex: number) => void;
}

function DraggableRowRenderer<R, SR>({
  rowIdx,
  isRowSelected,
  className,
  onRowReorder,
  ...props
}: DynamicProps<DraggableRowRenderProps<R, SR>>) {
  return (
    <Row
      rowIdx={rowIdx}
      isRowSelected={false}
      className={cx(
        className,
        "cursor-pointer !border-none !bg-[transparent] !outline-none"
      )}
      {...props}
    />
  );
}

// 侧边下拉菜单

export default function DatasourceMain() {
  const [{ data, isLoading }] = useAtom(plateListRelAtom);
  const [currentStock, updateCurSelectedStockAtom] =
    useAtom(curSelectedStockAtom);

  const columns: Column<StockListRow>[] = [
    {
      key: "stock_code",
      name: "股票代码",

      headerCellClass: "text-start",
      width: 70,
      cellClass: "text-start flex items-center justify-start",
      renderCell(row) {
        return (
          <Text
            onClickCapture={() => {
              updateCurSelectedStockAtom(() => row.row.stock_code);
            }}
            c="blue"
          >
            <span
              className={cx({
                underline: currentStock === row.row.stock_code
              })}
            >
              {row.row.stock_code}
            </span>
          </Text>
        );
      }
    },
    {
      key: "code_type",
      name: "类型",
      width: 30,
      headerCellClass: "text-center",
      cellClass: "text-center flex items-center justify-center",
      renderCell(row) {
        return <Badge>{row.row.code_type}</Badge>;
      }
    },
    {
      key: "exchange",
      name: "交易所",
      width: 58,
      headerCellClass: "text-center",
      cellClass: "text-center"
    },
    { key: "short_name", name: "名称", resizable: true },
    {
      key: "control",
      name: "操作",
      width: 28,
      resizable: true,
      renderCell() {
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
  }, [data]);

  const renderers: Renderers<StockListRow, unknown> = {
    renderRow(_info, props) {
      return (
        <DraggableRowRenderer
          {...props}
          rowIdx={props.rowIdx}
          isRowSelected={props.isRowSelected}
          onRowReorder={() => {
            console.log(
              `Row ${props.rowIdx} was reordered to ${props.rowIdx + 1}`
            );
          }}
        />
      );
    }
  };

  return (
    <>
      <div className={"h-full w-full grow"}>
        {isLoading ? (
          <Flex py={45} justify={"center"} align={"center"}>
            <Loader />
          </Flex>
        ) : rows.length !== 0 ? (
          <DataGrid<StockListRow>
            columns={columns}
            className={`!h-full grow !bg-[var(--mantine-color-body)] ![--rdg-background-color:var(--mantine-color-body)] ![--rdg-color:var(--mantine-color-text)] ![--rdg-header-background-color:var(--mantine-color-body)] ![--rdg-selection-color:var(--mantine-color-white-7)]`}
            rows={rows}
            rowKeyGetter={(state: StockListRow) =>
              state.stock_code + _.uniqueId()
            }
            renderers={renderers}
          />
        ) : (
          <Blockquote
            w={"92%"}
            iconSize={30}
            radius="xs"
            className={"cursor-pointer"}
            color="rgba(199, 199, 199, 1)"
            cite="– Forrest Gump"
            icon={<i className={"i-mdi-question-answer text-xl"} />}
            mt="sm"
            mx={"auto"}
          >
            Life is like an npm install – you never know what you are going to
            get.
          </Blockquote>
        )}
      </div>
    </>
  );
}
