import { cn, getUrl } from "@/lib/utils";
import { openModal, setRowData } from "@/store/updateDeviceSlice";
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ExternalLinkIcon, PenSquareIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DeleteDocumentIcon } from "../icons";

export function DataTableRowActions({ row }) {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const onAction = key => {
    switch (key) {
      case "open":
        navigate(
          `/regions/${row.original.region.id}/gates/${row.original.gate.id}/departments/${row.original.department.id}/offices/${row.original.office.id}/devices/${row.original.id}`
        );
        break;
      case "edit":
        dispatch(setRowData(row.original));
        dispatch(openModal());
        break;
      case "delete":
        const accessToken = window.localStorage.getItem("accessToken");
        let config = {
          method: "delete",
          url:
            getUrl() +
            `api/Regions/${row.original.region.id}/Gates/${row.original.gate.id}/Departments/${row.original.department.id}/offices/${row.original.office.id}/Devices/${row.original.id}`,
          headers: { "Content-Type": "application/json", Authorization: `bearer ${accessToken}` },
        };

        toast.promise(axios.request(config), {
          loading: <p>جاري حذف الجهاز</p>,
          success: () => {
            queryClient.refetchQueries({ type: "active" });
            return "تم حذف الجهاز بنجاح";
          },
          error: err => {
            console.log(err);
            return err.response.data.message || "حدث خطأ اثناء حذف الجهاز";
          },
        });
        break;
      default:
        break;
    }
  };

  return (
    <Dropdown dir="rtl">
      <DropdownTrigger>
        <Button isIconOnly variant="light" radius="full" size="sm">
          <DotsHorizontalIcon />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu with description" variant="faded" onAction={onAction}>
        <DropdownItem key="open" startContent={<ExternalLinkIcon className={iconClasses} />}>
          عرض التفاصيل
        </DropdownItem>
        <DropdownItem
          showDivider
          key="edit"
          startContent={<PenSquareIcon className={iconClasses} />}
        >
          تعديل البيانات
        </DropdownItem>

        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
        >
          حذف
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
