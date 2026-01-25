import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const DataTable = <T,>({
    columns,
    data,
    rowKey,
    onRowClick,
    onRowKeyDown,
    tableClassName,
    headerRowClassName,
    bodyRowClassName,
    enableKeyboardNav = false,
}: DataTableProps<T>) => {
    const isClickable = Boolean(onRowClick);

    return (
        <Table className={cn('custom-scrollbar', tableClassName)}>
            <TableHeader>
                <TableRow className={cn('hover:bg-transparent', headerRowClassName)}>
                    {columns.map((column, i) => (
                        <TableHead key={i} className={column.headClassName}>
                            {column.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, rowIndex) => (
                    <TableRow
                        key={rowKey(row, rowIndex)}
                        tabIndex={enableKeyboardNav ? 0 : undefined}
                        role={isClickable ? 'button' : undefined}
                        aria-label={isClickable ? `Select row ${rowIndex + 1}` : undefined}
                        onClick={() => onRowClick?.(row)}
                        onKeyDown={(e) => onRowKeyDown?.(e, row)}
                        className={cn(
                            isClickable &&
                            'cursor-pointer hover:bg-accent focus:bg-accent focus:outline-none focus:ring-2 focus:ring-primary transition-colors',
                            bodyRowClassName,
                        )}
                    >
                        {columns.map((column, columnIndex) => (
                            <TableCell key={columnIndex} className={column.cellClassName}>
                                {column.cell(row, rowIndex)}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default DataTable;
