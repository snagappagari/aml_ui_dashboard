// src/types/index.ts or wherever you keep shared types

export interface Alert {
  id: string;
  description: string;
  date: string;
  rule: number;
  alertStatus?: string;
  amount?: string;
  transactionType?: string;
  network?: string;
  country?: string;
  ruleVersion?: string;
  owner?: string;
  caseID?: string;
  downloadFile?: string;
  transactionId?: string;
}

export interface ApiAlert {
  alertId: string;
  transactionId: string;
  alertType: string;
  ruleId: number;
  status: string;
  country: string;
  region: string;
  city: string;
  mailSent: boolean;
  priority: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

export interface AlertCountData {
  TOTAL: number;
  high: number;
  medium: number;
  low: number;
  critical: number;
}

export interface AlertLocation {
  city: string;
  country: string;
  region: string;
  priority: string;
  count: number;
  latitude: number;
  longitude: number;
}


export interface StatusCount {
  CANCELLED: number;
  COMPLETED: number;
  FAILED: number;
  PENDING: number;
}
export interface DataSummary {
  totalCount: number;
  status: StatusCount;
}

export interface Table_Header {
  column: string | null;
  columnValue: string | null;
  width: string | null;
};

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
}