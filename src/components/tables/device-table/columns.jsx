import { Chip } from "@heroui/chip";
import { capitalize } from "lodash";
import { Clock } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
  {
    accessorKey: "domainIDIfExists",
    label: "رقم الجهاز",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] text-center">{row.getValue("domainIDIfExists")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
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
      return (
        <div className="flex w-[100px] items-center">
          <span className="text-nowrap">{row.getValue("region").name}</span>
        </div>
      );
    },
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
      return (
        <div className="flex w-[100px] items-center">
          <span className="text-nowrap">{row.getValue("gate").name}</span>
        </div>
      );
    },
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
      return (
        <div className="flex w-[100px] items-center">
          <span className="text-nowrap">{row.getValue("department").name}</span>
        </div>
      );
    },
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
      return (
        <div className="flex w-[100px] items-center">
          <span className="text-nowrap">{row.getValue("office").name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "deviceStatus",
    label: "حالة الجهاز",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => {
      switch (row.getValue("deviceStatus")) {
        case "InMaintain":
          return (
            <Chip color="warning" startContent={<Clock size={18} />}>
              تحت الصيانة
            </Chip>
          );
        default:
          return <Chip>مع المالك</Chip>;
      }
    },
  },
  {
    accessorKey: "type",
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
        <span className="max-w-[500px] truncate font-medium">{row.getValue("type")}</span>
      </div>
    ),
  },
  {
    accessorKey: "mac",
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
        <span className="max-w-[500px] truncate font-medium">{row.getValue("mac")}</span>
      </div>
    ),
  },
  {
    accessorKey: "owner",
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
        <span className="max-w-[500px] truncate font-medium">{row.getValue("owner")}</span>
      </div>
    ),
  },
  {
    accessorKey: "phoneNmber",
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
        <span className="max-w-[500px] truncate font-medium">{row.getValue("phoneNmber")}</span>
      </div>
    ),
  },
  {
    accessorKey: "cpu",
    label: "CPU",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("cpu")}</span>
      </div>
    ),
  },
  {
    accessorKey: "gpu",
    label: "GPU",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">{row.getValue("gpu")}</span>
      </div>
    ),
  },
  {
    accessorKey: "ramTotal",
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
        <span className="max-w-[500px] truncate font-medium">{row.getValue("ramTotal")}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdDate",
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
            {new Date(row.getValue("createdDate")).toLocaleString("ar-EG", { dateStyle: "short" })}
          </p>
          <p>
            {new Date(row.getValue("createdDate")).toLocaleString("ar-EG", { timeStyle: "short" })}
          </p>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <DataTableRowActions row={row} />
      </div>
    ),
  },
];
