import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    RowData,
    getFilteredRowModel,
    PaginationState,
    getExpandedRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Fragment, ReactNode, useState } from "react";
declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: "text" | "range" | "select";
        filterPositon?: "inline" | "bottom";
    }
}
import "./table.css";
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    getRowCanExpand?: () => boolean;
    renderSubComponent?: (row: TData) => ReactNode;
    pageSize?: number;
    tableNameRef?: string;
}

export function RootTable<TData, TValue>({
    columns,
    data,
    pageSize = 10,
}: DataTableProps<TData, TValue>) {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize,
    });
    const table = useReactTable({
        data,
        columns,
        state: {
            pagination,
        },
        defaultColumn: {
            size: 200,
            minSize: 10,
            maxSize: 500,
        },
        autoResetPageIndex: true,
        debugTable: false,
        onPaginationChange: setPagination,
        getExpandedRowModel: getExpandedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div
            className=" h-full flex-grow flex flex-col gap-1 relative text-card-foreground"
        >
            <div className="rounded-md border border-border w-full max-h-[100%] mx-auto overflow-y-auto scrollbar-custom">
                <Table className="table ">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="  bg-light-grey   rounded-md  "
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        style={{ width: `${header.getSize()}px` }}
                                        className={`   border-l  border-border text-center text-card-foreground    font-semibold   `}
                                    >
                                        <div
                                            className={`flex w-full  ${!header.column.getCanFilter()
                                                ? "justify-between"
                                                : "justify-center"
                                                } items-center  text-center `}
                                        >
                                            <div>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </div>
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <Fragment key={row.id}>
                                <TableRow key={row.id} className={`  text-md    text-left  `}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-xs  ">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </Fragment>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
