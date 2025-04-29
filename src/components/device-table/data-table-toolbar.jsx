import { Button } from "@/components/ui/button";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { RefreshCwIcon } from "lucide-react";
import { DataTableViewOptions } from "./data-table-view-options";

export function DataTableToolbar({ table }) {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching({ queryKey: ["table"] }); // Check if the table query is fetching

  const handleRefetch = () => {
    queryClient.refetchQueries({ queryKey: ["table"] });
  };

  return (
    <div className="flex items-center justify-between w-full gap-x-2">
      <Button size="icon" variant="secondary" onClick={handleRefetch}>
        <RefreshCwIcon className={isFetching ? "animate-spin" : ""} />
      </Button>
      <DataTableViewOptions table={table} />
    </div>
  );
}
