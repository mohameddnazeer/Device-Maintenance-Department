import { Chip } from "@heroui/chip";
import { capitalize } from "lodash";
import { CheckCircleIcon, XCircle } from "lucide-react";
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
        <span className="max-w-[200px] truncate font-medium">{row.getValue("macAddress")}</span>
      </div>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "soldierName",
    label: "مسلّم الجهاز",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[200px] truncate font-medium">{row.getValue("soldierName")}</span>
      </div>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "soldierNumber",
    label: "رقم المسلّم",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[200px] truncate font-medium">{row.getValue("soldierNumber")}</span>
      </div>
    ),
    enableGlobalFilter: false,
  },
  {
    accessorKey: "nozomSoldierName",
    label: "مستلم الجهاز",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[200px] truncate font-medium">
          {row.getValue("nozomSoldierName")}
        </span>
      </div>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "maintenanceSoldier",
    label: "القائم بالصيانة",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[200px] truncate font-medium">
          {row.getValue("maintenanceSoldier")}
        </span>
      </div>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "solved",
    label: "تم الحل",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span>
          {row.getValue("solved") ? (
            <Chip
              color="success"
              startContent={<CheckCircleIcon size={18} />}
              variant="flat"
              classNames={{ content: "text-sm" }}
            >
              تم الحل
            </Chip>
          ) : (
            <Chip
              color="danger"
              startContent={<XCircle size={18} />}
              variant="flat"
              classNames={{ content: "text-sm" }}
            >
              لم يتم الحل
            </Chip>
          )}
        </span>
      </div>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "error",
    label: "العطل",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[300px] truncate font-medium">{row.getValue("error")}</span>
      </div>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "notes",
    label: "ملاحظات",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right text-nowrap"
        column={column}
        title={column.columnDef.label || capitalize(column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[200px] truncate font-medium">{row.getValue("notes")}</span>
      </div>
    ),
    filterFn: "includesString",
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
