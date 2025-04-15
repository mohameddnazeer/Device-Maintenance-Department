import { cn, getUrl } from "@/lib/utils";
import { openMaintenance, setRowData as setData, setID } from "@/store/maintenanceModalSlice";
import { openModal, setRowData } from "@/store/updateModalSlice";
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { ExternalLinkIcon, PenSquareIcon, Trash2Icon } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export function DataTableRowActions({ row }) {
  const dispatch = useDispatch();

  const handleAction = key => {
    switch (key) {
      case "open":
        dispatch(setData(row.original));
        dispatch(setID(row.original.id));
        dispatch(openMaintenance());
        break;
      case "update":
        dispatch(setRowData(row.original));
        dispatch(openModal());
        break;

      case "update-status":
        dispatch(setRowData(row.original));
        dispatch(openModal());
        break;

      case "delete":
        const accessToken = window.localStorage.getItem("accessToken");
        let config = {
          method: "delete",
          url: getUrl() + `api/maintenance/${row.original.id}`,
          headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
        };

        toast.promise(axios.request(config), {
          loading: "جاري حذف عملية الصيانة...",
          success: () => {
            return "تم حذف عملية الصيانة بنجاح";
          },
          error: err => {
            console.log(err);
            return err.response.data.message || "حدث خطأ أثناء حذف عملية الصيانة";
          },
        });
        break;

      default:
        break;
    }
  };
  const iconClasses = "text-muted-foreground pointer-events-none flex-shrink-0 size-5";

  return (
    <div className="flex items-center gap-1">
      <Button
        size="sm"
        variant="light"
        color="success"
        onPress={() => {
          dispatch(setRowData(row.original));
          dispatch(openModal());
        }}
      >
        تسليم
      </Button>
      <Dropdown showArrow>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light" radius="full">
            <DotsHorizontalIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          dir="rtl"
          aria-label="Dropdown menu with description"
          variant="faded"
          onAction={handleAction}
        >
          <DropdownItem key="open" startContent={<ExternalLinkIcon className={iconClasses} />}>
            عرض التفاصيل
          </DropdownItem>
          <DropdownItem key="update" startContent={<PenSquareIcon className={iconClasses} />}>
            تعديل البيانات
          </DropdownItem>
          <DropdownItem
            key="update-status"
            startContent={<PenSquareIcon className={iconClasses} />}
          >
            تعديل حالة العطل
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            startContent={<Trash2Icon className={cn(iconClasses, "text-danger")} />}
          >
            حذف عملية الصيانة
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
