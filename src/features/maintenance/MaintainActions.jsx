import { openMaintenance, setRowData as setData, setID } from "@/store/maintenanceModalSlice";
import { Button } from "@heroui/button";
import { ExternalLinkIcon } from "lucide-react";
import { useDispatch } from "react-redux";

export function MaintainActions({ maintenanceRecord }) {
  const dispatch = useDispatch();

  const onOpenMaintenance = () => {
    dispatch(setData(maintenanceRecord));
    dispatch(setID(maintenanceRecord.id));
    dispatch(openMaintenance());
  };
  const iconClasses = "text-muted-foreground pointer-events-none flex-shrink-0 size-5";

  return (
    <Button isIconOnly onPress={onOpenMaintenance} variant="light" radius="full">
      <ExternalLinkIcon className={iconClasses} />
    </Button>
  );
}
