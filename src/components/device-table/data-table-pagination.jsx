import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function DataTablePagination({ table }) {
  return (
    <div className="flex items-center justify-between px-2">
      {/* <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center gap-x-2">
          <Button
            variant="secondary"
            className="hidden w-10 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Go to first page</span>
            <ChevronsRight />
          </Button>
          <Button
            variant="secondary"
            className="w-10 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Go to previous page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="secondary"
            className="w-10 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <span className="sr-only">Go to next page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="secondary"
            className="hidden w-10 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            <span className="sr-only">Go to last page</span>
            <ChevronsLeft />
          </Button>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            صفحة
            <span className="w-4 p-1">
              {(table.getState().pagination.pageIndex + 1).toLocaleString("ar-EG")}
            </span>
            من
            <span className="w-4 p-1">{table.getPageCount().toLocaleString("ar-EG")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
