import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { objectToSearchParams } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";

export function DataTablePagination({ table }) {
  const [_URLSearchParams, setURLSearchParams] = useSearchParams();

  const handlePageSizeChange = pageSize => {
    const newParams = objectToSearchParams({ pageSize }, _URLSearchParams);
    setURLSearchParams(newParams, { replace: true });
  };

  const handlePageChange = page => {
    const newParams = objectToSearchParams({ pageNumber: page }, _URLSearchParams);
    setURLSearchParams(newParams, { replace: true });
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center gap-x-2">
          <Button
            variant="secondary"
            className="hidden w-10 p-0 lg:flex"
            onClick={() => handlePageChange(1)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsRight />
          </Button>
          <Button
            variant="secondary"
            className="w-10 p-0"
            onClick={() => handlePageChange(table.getState().pagination.pageIndex)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="secondary"
            className="w-10 p-0"
            onClick={() => handlePageChange(table.getState().pagination.pageIndex + 2)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="secondary"
            className="hidden w-10 p-0 lg:flex"
            onClick={() => handlePageChange(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
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
      <div className="flex items-center gap-x-2 mr-auto">
        <p className="text-sm font-medium">عدد الصفوف</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={value => handlePageSizeChange(Number(value))}
        >
          <SelectTrigger className="w-[70px] bg-secondary">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map(pageSize => (
              <SelectItem dir="rtl" key={pageSize} className="ps-4" value={`${pageSize}`}>
                {pageSize.toLocaleString("ar-EG")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
