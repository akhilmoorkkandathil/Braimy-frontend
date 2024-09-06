export interface Column {
    columnDef: string;
    header: string;
    cell: Function;
  }

export interface userColumn{
  columnDef: string;
  header: string;
  cell: (element: Record<string, any>, index?: number) => string;
}