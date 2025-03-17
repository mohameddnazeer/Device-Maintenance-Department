"use client";

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { objectToSearchParamsStr } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { taskSchema } from "./schema";

export function DataTable({ columns, data }) {
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const initialVisibility = Object.keys(taskSchema.shape)
    .map((key) => ({ [key]: false }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  const storedVisibility = JSON.parse(sessionStorage.getItem("columnVisibility")) || {};
  const [columnVisibility, setColumnVisibility] = useState({
    ...initialVisibility,
    id: true,
    macAddress: true,
    region: true,
    // gate: true,
    department: true,
    office: true,
    ownerName: true,
    ...storedVisibility,
  });

  useEffect(() => {
    sessionStorage.setItem("columnVisibility", JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  const [sorting, setSorting] = useState(() => {
    const sort = URLSearchParams.get("_sort");

    return sort
      ? [
          {
            id: sort.startsWith("-") ? sort.slice(1) : sort,
            desc: sort.startsWith("-") ? true : false,
          },
        ]
      : [{ id: "createdAt", desc: true }];
  });
  const queryClient = useQueryClient();
  const res = queryClient.getQueryData(["table", "devices"]);
  const currentPage = URLSearchParams.get("_page") || 1;
  const pageSize = URLSearchParams.get("_per_page") || 10;

  const table = useReactTable({
    columns,
    data,
    state: { sorting, columnVisibility },
    initialState: { pagination: { pageIndex: currentPage - 1, pageSize } },
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    pageCount: res.pages,
    onSortingChange: (updaterOrValue) => {
      const sort = updaterOrValue();
      const newParams = objectToSearchParamsStr(
        { _sort: `${sort[0].desc ? "-" : ""}${sort[0].id}` },
        URLSearchParams
      );
      setURLSearchParams(newParams, { replace: true });
      setSorting(sort);
    },
    onColumnVisibilityChange: (updaterOrValue) => {
      const colVisibility = updaterOrValue();
      setColumnVisibility((colvis) => {
        return { ...colvis, ...colVisibility };
      });
    },
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: (table, columnId) => () => {
      const res = queryClient.getQueryData(["table", columnId]);
      const uniqueValueMap = new Map();
      res && Array.isArray(res) && res.forEach((item) => uniqueValueMap.set(item.id, item.number));
      return uniqueValueMap;
    },
  });

  table.getAllColumns();
  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <Table>
        <TableHeader className="sticky top-0 z-20">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="group/tr border-none cursor-default">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="group/th px-3 bg-accent whitespace-nowrap font-semibold"
                    key={header.id}
                    colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow
                key={row.id}
                className={`group/tr border-none cursor-default ${
                  rowIndex % 2 === 0 ? "bg-background" : ""
                }`}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={`relative text-start ${
                      rowIndex === 0 ? "first:rounded-ss-lg last:rounded-se-lg" : ""
                    } ${
                      rowIndex === table.getRowModel().rows.length - 1
                        ? "first:rounded-es-lg last:rounded-ee-lg"
                        : ""
                    }`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                لا يوجد بيانات
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}
