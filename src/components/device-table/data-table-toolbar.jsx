import { RefreshCwIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./data-table-view-options";

import { useQueryClient } from "@tanstack/react-query";
import { capitalize } from "lodash";
// import { departments, gates, offices, regions } from "./data";
import { deleteKeysFromSearchParams, getFacetedUniqueValues } from "@/lib/utils";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

export function DataTableToolbar({ table }) {
  const facetedColumns = getFacetedUniqueValues();
  const [URLSearchParams, setURLSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => {
    const newSet = new Set();
    facetedColumns.forEach((id) => {
      const selected = URLSearchParams.get(id);
      if (selected) selected.split(",").forEach((value) => newSet.add(value));
    });
    return newSet;
  });

  const isFiltered = filters.size > 0;
  const regionColumn = table.getColumn("region");
  const gateColumn = table.getColumn("gate");
  const departmentColumn = table.getColumn("department");
  const officeColumn = table.getColumn("office");
  const queryClient = useQueryClient();

  const handleRefetch = () => {
    queryClient.refetchQueries({ queryKey: ["table"] });
  };

  const region = queryClient.getQueryData(["table", "region"]);
  const gate = queryClient.getQueryData(["table", "gate"]);
  const department = queryClient.getQueryData(["table", "department"]);
  const office = queryClient.getQueryData(["table", "office"]);

  const formatOptions = (data) => {
    return Array.isArray(data) ? data.map(({ id, label }) => ({ value: id, label: label })) : [];
  };

  const regions = formatOptions(region);
  const gates = formatOptions(gate);
  const departments = formatOptions(department);
  const offices = formatOptions(office);

  const resetFilters = () => {
    setFilters(new Set());
    const searchParams = deleteKeysFromSearchParams(facetedColumns, URLSearchParams);
    setURLSearchParams(searchParams, { replace: true });
  };

  return (
    <div className="flex items-center gap-x-2">
      <div className="flex flex-1 items-center gap-x-2">
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
          <Button variant="ghost" onClick={resetFilters} className="px-2 lg:px-3 text-base">
            حذف
            <X />
          </Button>
        )}
      </div>
      <Button size="icon" variant="secondary" onClick={handleRefetch}>
        <RefreshCwIcon />
      </Button>
      <DataTableViewOptions table={table} />
    </div>
  );
}
