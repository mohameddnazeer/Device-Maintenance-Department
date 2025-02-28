import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalize } from "lodash";
import { departments, gates, offices, regions } from "./data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const regionColumn = table.getColumn("region");
  const gateColumn = table.getColumn("gate");
  const departmentColumn = table.getColumn("department");
  const officeColumn = table.getColumn("office");

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-x-2">
        <Input
          placeholder="بحث"
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="w-[150px] lg:w-[450px] dark:bg-light-background md:text-base"
        />
        {regionColumn && regionColumn.getIsVisible() && (
          <DataTableFacetedFilter
            column={regionColumn}
            title={regionColumn.columnDef.label || capitalize(regionColumn.id)}
            options={regions}
          />
        )}
        {gateColumn && gateColumn.getIsVisible() && (
          <DataTableFacetedFilter
            column={gateColumn}
            title={gateColumn.columnDef.label || capitalize(gateColumn.id)}
            options={gates}
          />
        )}
        {departmentColumn && departmentColumn.getIsVisible() && (
          <DataTableFacetedFilter
            column={departmentColumn}
            title={departmentColumn.columnDef.label || capitalize(departmentColumn.id)}
            options={departments}
          />
        )}
        {officeColumn && officeColumn.getIsVisible() && (
          <DataTableFacetedFilter
            column={officeColumn}
            title={officeColumn.columnDef.label || capitalize(officeColumn.id)}
            options={offices}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="px-2 lg:px-3 text-base">
            حذف
            <X />
          </Button>
        )}
        <div className="flex items-center gap-x-2 mr-auto pl-2">
          <p className="text-sm font-medium">عدد الصفوف</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}>
            <SelectTrigger className="w-[70px] bg-secondary">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem dir="rtl" key={pageSize} className="ps-4" value={`${pageSize}`}>
                  {pageSize.toLocaleString("ar-EG")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
