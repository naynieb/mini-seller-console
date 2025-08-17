import React, { memo } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  onSort?: (key: keyof T) => void;
  sortKey?: keyof T;
  sortDirection?: 'asc' | 'desc';
}

function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  onSort,
  sortKey,
  sortDirection
}: DataTableProps<T>) {
  const renderSortIndicator = (column: Column<T>) => {
    if (!onSort || !column.sortable || sortKey !== column.key) return null;
    
    return sortDirection === 'asc' 
      ? <ArrowUpIcon className="ml-1 w-4 h-4" />
      : <ArrowDownIcon className="ml-1 w-4 h-4" />;
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key.toString()}
                  scope="col"
                  className={`
                    px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider
                    ${column.sortable && onSort ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''}
                  `}
                  onClick={() => column.sortable && onSort ? onSort(column.key) : undefined}
                >
                  <div className="flex items-center">
                    {column.header} {renderSortIndicator(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr
                key={keyExtractor(item)}
                onClick={() => onRowClick && onRowClick(item)}
                className={`
                  ${onRowClick ? 'hover:bg-blue-50 cursor-pointer transition-all duration-200' : ''}
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                `}
              >
                {columns.map((column) => (
                  <td key={`${keyExtractor(item)}-${column.key.toString()}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render ? column.render(item) : String(item[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(DataTable) as typeof DataTable;
