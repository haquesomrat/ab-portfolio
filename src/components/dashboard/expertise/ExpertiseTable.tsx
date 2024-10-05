"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Expertises } from "@/types/types";
import { getAllExpertises } from "../../../../actions/expertise/get-all-expertises";
import { deleteExpertise } from "../../../../actions/expertise/delete-expertise";
import { toast } from "sonner";

export function ExpertiseTable() {
  // Explicitly define the state type as an array of Companies
  const [expertises, setExpertises] = React.useState<Expertises[]>([]); //fakeOrbitalsData

  console.log(expertises);

  // Fetch all companies on component mount
  React.useEffect(() => {
    const getExpertises = async () => {
      try {
        const response = await getAllExpertises();
        if (response?.ok) {
          const data: Expertises[] = await response.json();
          setExpertises(data);
        } else {
          console.error("Failed to fetch expertises");
        }
      } catch (error) {
        console.error("An error occurred while fetching expertises:", error);
      }
    };
    getExpertises();
  }, []);

  // Handle company deletion
  const handleDeleteCompany = async (id: string) => {
    try {
      const response = await deleteExpertise(id);
      const data = await response?.json();
      const selectedExpertise = expertises.filter(
        (expertise) => expertise._id === id
      );
      const deletedExpertiseName = selectedExpertise[0]?.name;
      if (response?.ok) {
        // Show success toast with the response message
        toast.success(`${deletedExpertiseName} is deleted successfully`, {
          position: "top-center",
        });

        // Update the companies state by filtering out the updated project
        setExpertises((prevExpertise) =>
          prevExpertise.filter((expertise) => expertise._id !== id)
        );
      } else {
        toast.success(data?.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const data: Expertises[] = expertises;

  const columns: ColumnDef<Expertises>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "icon",
      header: "Logo",
      cell: ({ row }: { row: { getValue: (key: string) => string } }) => {
        const icon: string = row.getValue("icon");
        return (
          <div>
            <div dangerouslySetInnerHTML={{ __html: icon }} />
          </div>
        );
      },
    },
    {
      accessorKey: "duration",
      header: ({ column }) => {
        return <div>Duration</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("duration")}</div>
      ),
    },
    {
      accessorKey: "delay",
      header: ({ column }) => {
        return <div>Delay</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("delay")}</div>
      ),
    },
    {
      accessorKey: "radiusSmall",
      header: ({ column }) => {
        return <div>Orbit size(Mobile)</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("radiusSmall")}</div>
      ),
    },
    {
      accessorKey: "radiusLarge",
      header: ({ column }) => {
        return <div>Orbit size(Desktop)</div>;
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("radiusLarge")}</div>
      ),
    },
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link
                href={`/dashboard/expertise/${row?.original?._id}/update-expertise`}
              >
                <DropdownMenuItem className="cursor-pointer">
                  Edit
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => handleDeleteCompany(row?.original?._id)}
                className="cursor-pointer"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full py-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter expertise names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
