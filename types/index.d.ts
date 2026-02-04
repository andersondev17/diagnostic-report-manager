// type User = {
//   name: string;
//   email: string;
//   image?: string;
//   accountId: string;
// };
enum ReportStatus {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type TReport = Models.DocumentList<Models.Document> & {
  id: string;
  name: string;
  size: string;
  type: ReportType;
  date: string;
  status?: ReportStatus;
  createdAt?: string;
  updatedAt?: string;
};

type ReportId = string & { readonly __brand: 'ReportId' };

interface ReportCardProps {
  id: string;
  name: string;
  size: string;
  type: string;
  date: string;
  color: string;
}
interface CreateReport {
  name: string;
  size: string;
  type: ReportType;
  date: string;
  color: string;
}


interface GetAllReportsParams {
  limit?: number;
  page?: number;
  name?: string;
  type?: string;
  status?: string;
}

interface PaginatedReports {
  data: TReport[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
interface BuildClient {
  key?: string;
  sessionToken?: string;
}


interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface Avatar {
  userName: string;
  width: number;
  height: number;
  className?: string;
}


interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface ReportComponentProps {
  reportId: ReportId;
  name: string;
  size: string;
  type: ReportType;
  date: string;
  status?: ReportStatus;
  createdAt?: string;
  updatedAt?: string;
}

interface DataTableColumn<T> {
  header: string;
  cell: (item: T, index: number) => React.ReactNode;
  cellClassName?: string;
  headClassName?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (item: T, index: number) => string | number;
  onRowClick?: (item: T) => void;
  onRowKeyDown?: (e: React.KeyboardEvent<HTMLTableRowElement>, item: T) => void;
  tableClassName?: string;
  headerRowClassName?: string;
  bodyRowClassName?: string;
  enableKeyboardNav?: boolean;
}

type ReportOperation = {
  id: string;
  type: 'ADD' | 'UPDATE' | 'REMOVE';
  status: UploadStatus;
  timestamp: number;
};
