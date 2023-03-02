import { Table as PrimitiveTable } from '@hookooekoo/ui-table';
import { ComponentProps } from 'react';

export function Table<TData>({ data, columns }: ComponentProps<typeof PrimitiveTable<TData>>) {
  return (
    <PrimitiveTable
      data={data}
      columns={columns}
    />
  );
}
