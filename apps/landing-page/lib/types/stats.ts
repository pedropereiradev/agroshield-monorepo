export interface StatsResponse {
  leadCount: number;
  displayCount: string;
  lastUpdated: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface DatabaseQueryResult {
  total_leads: string | number;
}
