"use client";
import { useAtom } from "jotai";
import { stockListAtom } from "@/app/utils/store/chartStore";
import DataGrid, {
  type Column,
  type Renderers,
  type RenderRowProps,
  Row
} from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useMemo } from "react";
import { css, cx } from "@emotion/css";
import { ActionIcon, Badge, Blockquote, Flex, Loader } from "@mantine/core";
import type { DynamicProps } from "@/app/types/misc";
import _ from "underscore";

const rowDraggingClassname = css`
  opacity: 0.5;
`;

const rowOverClassname = css`
  background-color: #ececec;
`;
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
  const [{ isDragging }, drag] = useDrag({
    type: "ROW_DRAG",
    item: { index: rowIdx },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging()
      };
    }
  });

  const [{ isOver }, drop] = useDrop({
    accept: "ROW_DRAG",
    drop({ index }: { index: number }) {
      onRowReorder(index, rowIdx);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  className = cx(className, {
    [rowDraggingClassname]: isDragging,
    [rowOverClassname]: isOver
  });
  return (
    <Row
      ref={(ref) => {
        if (ref) {
          drag(ref.firstElementChild);
        }
        drop(ref);
      }}
      rowIdx={rowIdx}
      isRowSelected={true}
      className={cx(className, "cursor-pointer !border-none !outline-none")}
      {...props}
    />
  );
}
export default function Datasource() {
  const [{ data, isLoading }] = useAtom(stockListAtom);
  interface StockListRow {
    stock_code: string;
    code_type: string;
    exchange: string;
    short_name: string;
  }
  const columns: Column<StockListRow>[] = [
    { key: "stock_code", name: "股票代码", width: 58 },
    {
      key: "code_type",
      name: "类型",
      width: 28,
      renderCell(row) {
        return <Badge>{row.row.code_type}</Badge>;
      }
    },
    { key: "exchange", name: "交易所", width: 58 },
    { key: "short_name", name: "名称", resizable: true },
    {
      key: "control",
      name: "操作",
      width: 28,
      resizable: true,
      renderCell(_row) {
        return (
          <ActionIcon variant="transparent" aria-label="menu">
            <i className={"i-mdi-menu"}></i>
          </ActionIcon>
        );
      }
    }
  ];
  const rows = useMemo(() => {
    if (!data?.content) return [];
    return data.content;
  }, [data]);

  const renderers: Renderers<StockListRow, null> = {
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
    <div className={"h-full w-full grow"}>
      {isLoading ? (
        <Flex py={45} justify={"center"} align={"center"}>
          <Loader />
        </Flex>
      ) : rows.length !== 0 ? (
        <DndProvider backend={HTML5Backend}>
          <DataGrid<StockListRow>
            columns={columns}
            className={"!h-full grow"}
            rows={rows}
            rowKeyGetter={(state: StockListRow) =>
              state.stock_code + _.uniqueId()
            }
            renderers={renderers}
          />
        </DndProvider>
      ) : (
        <Blockquote
          iconSize={30}
          radius="xs"
          className={"cursor-pointer"}
          color="rgba(199, 199, 199, 1)"
          cite="– Forrest Gump"
          icon={<i className={"i-mdi-info text-xl"} />}
          mt="sm"
        >
          Life is like an npm install – you never know what you are going to
          get.
        </Blockquote>
      )}
    </div>
  );
}
