import { RefreshCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./data-table-view-options";

import { useQueryClient } from "@tanstack/react-query";

export function DataTableToolbar({ table }) {
  const queryClient = useQueryClient();

  const handleRefetch = () => {
    queryClient.refetchQueries({ queryKey: ["table"] });
  };

  return (
    <div className="flex items-center justify-between w-full gap-x-2">
      <Button size="icon" variant="secondary" onClick={handleRefetch}>
        <RefreshCwIcon />
      </Button>
      <DataTableViewOptions table={table} />
    </div>
  );
}
