"use client";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { objectToSearchParamsStr } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { taskSchema } from "./schema";

export function DataTable({ columns, data }) {
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const initialVisibility = Object.keys(taskSchema.shape)
    .map(key => ({ [key]: false }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  const storedVisibility = JSON.parse(sessionStorage.getItem("op-columnVisibility")) || {};
  const [columnVisibility, setColumnVisibility] = useState({
    ...initialVisibility,
    deviceId: true,
    delievry: true,
    delievryPhoneNumber: true,
    // receiverName: true,
    maintainerName: true,
    failureMaintains: true,
    notes: true,
    state: true,
    // maintainLocation: true,
    isDelivered: true,
    // createdDate: true,
    ...storedVisibility,
  });

  useEffect(() => {
    sessionStorage.setItem("op-columnVisibility", JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  const [sorting, setSorting] = useState(() => {
    const sort = URLSearchParams.get("OrderBy");

    return sort
      ? [
          {
            id: sort.includes("desc") ? sort.replace(" desc", "") : sort,
            desc: sort.includes("desc") ? true : false,
          },
        ]
      : [{ id: "createdDate", desc: true }];
  });

  const currentPage = URLSearchParams.get("pageNumber") || 1;
  const pageSize = URLSearchParams.get("pageSize") || 10;

  const table = useReactTable({
    columns,
    data: data?.response?.data,
    state: { sorting, columnVisibility },
    initialState: { pagination: { pageIndex: currentPage - 1, pageSize } },
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    pageCount: data?.pagination?.totalPages,
    onSortingChange: updaterOrValue => {
      const sort = updaterOrValue();
      const newParams = objectToSearchParamsStr(
        { OrderBy: `${sort[0].id}${sort[0].desc ? " desc" : ""}` },
        URLSearchParams
      );
      setURLSearchParams(newParams, { replace: true });
      setSorting(sort);
    },
    onColumnVisibilityChange: updaterOrValue => {
      const colVisibility = updaterOrValue();
      setColumnVisibility(colvis => ({ ...colvis, ...colVisibility }));
    },
    getCoreRowModel: getCoreRowModel(),
  });

  table.getAllColumns();
  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <Table>
        <TableHeader className="sticky top-0 z-20">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className="group/tr border-none cursor-default">
              {headerGroup.headers.map(header => {
                return (
                  <TableHead
                    className="group/th px-3 bg-accent whitespace-nowrap font-semibold"
                    key={header.id}
                    colSpan={header.colSpan}
                  >
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
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow
                key={row.id}
                className={`group/tr border-none cursor-default ${
                  rowIndex % 2 === 0 ? "bg-background" : ""
                }`}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell
                    key={cell.id}
                    className={`relative text-start ${
                      rowIndex === 0 ? "first:rounded-ss-lg last:rounded-se-lg" : ""
                    } ${
                      rowIndex === table.getRowModel().rows?.length - 1
                        ? "first:rounded-es-lg last:rounded-ee-lg"
                        : ""
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns?.length} className="h-24 text-center">
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
