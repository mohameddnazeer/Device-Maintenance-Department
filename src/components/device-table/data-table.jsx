"use client";

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { taskSchema } from "./schema";

export function DataTable({ columns, data }) {
  const initialVisibility = Object.keys(taskSchema.shape)
    .map((key) => ({ [key]: false }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  const [columnVisibility, setColumnVisibility] = React.useState({
    ...initialVisibility,
    id: true,
    macAddress: true,
    region: true,
    // gate: true,
    department: true,
    office: true,
    ownerName: true,
  });
  // const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState([]);
  const [sorting, setSorting] = React.useState([{ id: "createdAt", desc: true }]);

  const table = useReactTable({
    columns,
    data,
    state: {
      sorting,
      columnVisibility,
      globalFilter,
      // columnFilters,
    },
    // enableRowSelection: false,
    // onRowSelectionChange: setRowSelection,
    // globalFilterFn: "includesString",
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    // onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  table.getAllColumns();
  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <Table className="">
        <TableHeader className="sticky top-0 z-20">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              // group/tr outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 cursor-default
              className="group/tr border-none cursor-default">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="group/th px-3 h-10 bg-accent whitespace-nowrap font-semibold first:rounded-s-lg last:rounded-e-lg"
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
        <TableBody className="">
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
