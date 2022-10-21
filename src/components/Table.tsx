import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

interface TableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
}

export function useTableColumnHelper<TData>() {
  return createColumnHelper<TData>();
}

export function Table<TData>({ data, columns }: TableProps<TData>) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <table className="table-auto text-12 border border-secondary-5 select-none">
      <thead className="text-secondary-3">
        {table.getHeaderGroups().map(headerGroup => (
          <tr
            key={headerGroup.id}
            className="border-b border-b-secondary-5"
          >
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className="pt-16 pb-10 px-30 font-normal"
              >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody className="text-green-deep">
        {table.getRowModel().rows.map(row => (
          <tr
            key={row.id}
            className="border-b border-b-secondary-5"
          >
            {row.getVisibleCells().map(cell => (
              <td
                key={cell.id}
                className="py-10 px-30"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
