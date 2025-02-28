import { capitalize } from "lodash";
import { departments, gates, offices, regions } from "./data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
  {
    accessorKey: "id",
    label: "رقم الجهاز",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => <div className="w-[80px] text-center">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "region",
    label: "القطاع",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => {
      const region = regions.find((reg) => reg.value === row.getValue("region"));

      if (!region) return null;

      return (
        <div className="flex w-[100px] items-center">
          <span className="text-nowrap">{region.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "gate",
    label: "البوابة",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => {
      const gate = gates.find((gat) => gat.value === row.getValue("gate"));

      if (!gate) return null;

      return (
        <div className="flex w-[100px] items-center">
          <span className="text-nowrap">{gate.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "department",
    label: "الادارة",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => {
      const department = departments.find((dep) => dep.value === row.getValue("department"));

      if (!department) return null;

      return (
        <div className="flex w-[100px] items-center">
          <span className="text-nowrap">{department.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "office",
    label: "المكتب",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => {
      const office = offices.find((ofi) => ofi.value === row.getValue("office"));

      if (!office) return null;

      return (
        <div className="flex w-[100px] items-center">
          <span className="text-nowrap">{office.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "deviceType",
    label: "نوع الجهاز",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("deviceType")}</span>
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "macAddress",
    label: "عنوان MAC",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("macAddress")}</span>
      </div>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "ownerName",
    label: "اسم المالك",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("ownerName")}</span>
      </div>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "ownerNumber",
    label: "رقم المالك",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("ownerNumber")}</span>
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "cpuType",
    label: "نوع CPU",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("cpuType")}</span>
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "cpuModel",
    label: "موديل CPU",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("cpuModel")}</span>
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "cpuGeneration",
    label: "جيل CPU",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("cpuGeneration")}</span>
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "gpuType",
    label: "نوع GPU",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("gpuType")}</span>
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "gpuModel",
    label: "موديل GPU",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("gpuModel")}</span>
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "gpuSize",
    label: "حجم GPU",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("gpuSize")}</span>
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "ramSize",
    label: "حجم RAM",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("ramSize")}</span>
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "ramType",
    label: "نوع RAM",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("ramType")}</span>
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "romSize",
    label: "حجم ROM",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("romSize")}</span>
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "romType",
    label: "نوع ROM",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("romType")}</span>
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "createdAt",
    label: "تاريخ الاضافة",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-right text-nowrap gap-4 flex">
          <p>
            {new Date(row.getValue("createdAt")).toLocaleString("ar-EG", { dateStyle: "short" })}
          </p>
          <p>
            {new Date(row.getValue("createdAt")).toLocaleString("ar-EG", { timeStyle: "short" })}
          </p>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
    enableGlobalFilter: false,
    // filterFn: "includesString",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <DataTableRowActions row={row} />
      </div>
    ),
    enableGlobalFilter: false,
  },
];
