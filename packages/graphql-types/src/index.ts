export * from './generated';

export interface PaginationArgs {
  limit?: number;
  offset?: number;
}

export interface WhereCondition {
  [key: string]: any;
}

export interface OrderBy {
  [key: string]:
    | 'asc'
    | 'desc'
    | 'asc_nulls_first'
    | 'asc_nulls_last'
    | 'desc_nulls_first'
    | 'desc_nulls_last';
}
