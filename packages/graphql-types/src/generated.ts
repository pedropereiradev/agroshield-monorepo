export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  contract_type: { input: any; output: any; }
  jsonb: { input: any; output: any; }
  numeric: { input: any; output: any; }
  timestamp: { input: any; output: any; }
  timestamptz: { input: string; output: string; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** columns and relationships of "Claims" */
export type Claims = {
  __typename?: 'Claims';
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  id: Scalars['String']['output'];
  newStatus: Scalars['String']['output'];
  oldStatus: Scalars['String']['output'];
  /** An object relationship */
  policy?: Maybe<Policies>;
  policy_id: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
};

/** order by aggregate values of table "Claims" */
export type Claims_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Claims_Max_Order_By>;
  min?: InputMaybe<Claims_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "Claims". All fields are combined with a logical 'AND'. */
export type Claims_Bool_Exp = {
  _and?: InputMaybe<Array<Claims_Bool_Exp>>;
  _not?: InputMaybe<Claims_Bool_Exp>;
  _or?: InputMaybe<Array<Claims_Bool_Exp>>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  newStatus?: InputMaybe<String_Comparison_Exp>;
  oldStatus?: InputMaybe<String_Comparison_Exp>;
  policy?: InputMaybe<Policies_Bool_Exp>;
  policy_id?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "Claims" */
export type Claims_Max_Order_By = {
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  newStatus?: InputMaybe<Order_By>;
  oldStatus?: InputMaybe<Order_By>;
  policy_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "Claims" */
export type Claims_Min_Order_By = {
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  newStatus?: InputMaybe<Order_By>;
  oldStatus?: InputMaybe<Order_By>;
  policy_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "Claims". */
export type Claims_Order_By = {
  db_write_timestamp?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  newStatus?: InputMaybe<Order_By>;
  oldStatus?: InputMaybe<Order_By>;
  policy?: InputMaybe<Policies_Order_By>;
  policy_id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "Claims" */
export type Claims_Select_Column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'id'
  /** column name */
  | 'newStatus'
  /** column name */
  | 'oldStatus'
  /** column name */
  | 'policy_id'
  /** column name */
  | 'timestamp';

/** Streaming cursor of the table "Claims" */
export type Claims_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Claims_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Claims_Stream_Cursor_Value_Input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  newStatus?: InputMaybe<Scalars['String']['input']>;
  oldStatus?: InputMaybe<Scalars['String']['input']>;
  policy_id?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** columns and relationships of "Policies" */
export type Policies = {
  __typename?: 'Policies';
  /** An array relationship */
  claims: Array<Claims>;
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  endDate: Scalars['String']['output'];
  id: Scalars['String']['output'];
  insuredValue: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  policyId: Scalars['String']['output'];
  policyType: Scalars['String']['output'];
  premium: Scalars['String']['output'];
  startDate: Scalars['String']['output'];
  status: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
};


/** columns and relationships of "Policies" */
export type PoliciesClaimsArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "Policies". All fields are combined with a logical 'AND'. */
export type Policies_Bool_Exp = {
  _and?: InputMaybe<Array<Policies_Bool_Exp>>;
  _not?: InputMaybe<Policies_Bool_Exp>;
  _or?: InputMaybe<Array<Policies_Bool_Exp>>;
  claims?: InputMaybe<Claims_Bool_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  endDate?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  insuredValue?: InputMaybe<String_Comparison_Exp>;
  owner?: InputMaybe<String_Comparison_Exp>;
  policyId?: InputMaybe<String_Comparison_Exp>;
  policyType?: InputMaybe<String_Comparison_Exp>;
  premium?: InputMaybe<String_Comparison_Exp>;
  startDate?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "Policies". */
export type Policies_Order_By = {
  claims_aggregate?: InputMaybe<Claims_Aggregate_Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  endDate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  insuredValue?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  policyId?: InputMaybe<Order_By>;
  policyType?: InputMaybe<Order_By>;
  premium?: InputMaybe<Order_By>;
  startDate?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "Policies" */
export type Policies_Select_Column =
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'endDate'
  /** column name */
  | 'id'
  /** column name */
  | 'insuredValue'
  /** column name */
  | 'owner'
  /** column name */
  | 'policyId'
  /** column name */
  | 'policyType'
  /** column name */
  | 'premium'
  /** column name */
  | 'startDate'
  /** column name */
  | 'status'
  /** column name */
  | 'timestamp';

/** Streaming cursor of the table "Policies" */
export type Policies_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Policies_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Policies_Stream_Cursor_Value_Input = {
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  insuredValue?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  policyId?: InputMaybe<Scalars['String']['input']>;
  policyType?: InputMaybe<Scalars['String']['input']>;
  premium?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "chain_metadata" */
export type Chain_Metadata = {
  __typename?: 'chain_metadata';
  block_height: Scalars['Int']['output'];
  chain_id: Scalars['Int']['output'];
  end_block?: Maybe<Scalars['Int']['output']>;
  first_event_block_number?: Maybe<Scalars['Int']['output']>;
  is_hyper_sync: Scalars['Boolean']['output'];
  latest_fetched_block_number: Scalars['Int']['output'];
  latest_processed_block?: Maybe<Scalars['Int']['output']>;
  num_batches_fetched: Scalars['Int']['output'];
  num_events_processed?: Maybe<Scalars['Int']['output']>;
  start_block: Scalars['Int']['output'];
  timestamp_caught_up_to_head_or_endblock?: Maybe<Scalars['timestamptz']['output']>;
};

/** Boolean expression to filter rows from the table "chain_metadata". All fields are combined with a logical 'AND'. */
export type Chain_Metadata_Bool_Exp = {
  _and?: InputMaybe<Array<Chain_Metadata_Bool_Exp>>;
  _not?: InputMaybe<Chain_Metadata_Bool_Exp>;
  _or?: InputMaybe<Array<Chain_Metadata_Bool_Exp>>;
  block_height?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  end_block?: InputMaybe<Int_Comparison_Exp>;
  first_event_block_number?: InputMaybe<Int_Comparison_Exp>;
  is_hyper_sync?: InputMaybe<Boolean_Comparison_Exp>;
  latest_fetched_block_number?: InputMaybe<Int_Comparison_Exp>;
  latest_processed_block?: InputMaybe<Int_Comparison_Exp>;
  num_batches_fetched?: InputMaybe<Int_Comparison_Exp>;
  num_events_processed?: InputMaybe<Int_Comparison_Exp>;
  start_block?: InputMaybe<Int_Comparison_Exp>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** Ordering options when selecting data from "chain_metadata". */
export type Chain_Metadata_Order_By = {
  block_height?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  end_block?: InputMaybe<Order_By>;
  first_event_block_number?: InputMaybe<Order_By>;
  is_hyper_sync?: InputMaybe<Order_By>;
  latest_fetched_block_number?: InputMaybe<Order_By>;
  latest_processed_block?: InputMaybe<Order_By>;
  num_batches_fetched?: InputMaybe<Order_By>;
  num_events_processed?: InputMaybe<Order_By>;
  start_block?: InputMaybe<Order_By>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<Order_By>;
};

/** select columns of table "chain_metadata" */
export type Chain_Metadata_Select_Column =
  /** column name */
  | 'block_height'
  /** column name */
  | 'chain_id'
  /** column name */
  | 'end_block'
  /** column name */
  | 'first_event_block_number'
  /** column name */
  | 'is_hyper_sync'
  /** column name */
  | 'latest_fetched_block_number'
  /** column name */
  | 'latest_processed_block'
  /** column name */
  | 'num_batches_fetched'
  /** column name */
  | 'num_events_processed'
  /** column name */
  | 'start_block'
  /** column name */
  | 'timestamp_caught_up_to_head_or_endblock';

/** Streaming cursor of the table "chain_metadata" */
export type Chain_Metadata_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Chain_Metadata_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Chain_Metadata_Stream_Cursor_Value_Input = {
  block_height?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  end_block?: InputMaybe<Scalars['Int']['input']>;
  first_event_block_number?: InputMaybe<Scalars['Int']['input']>;
  is_hyper_sync?: InputMaybe<Scalars['Boolean']['input']>;
  latest_fetched_block_number?: InputMaybe<Scalars['Int']['input']>;
  latest_processed_block?: InputMaybe<Scalars['Int']['input']>;
  num_batches_fetched?: InputMaybe<Scalars['Int']['input']>;
  num_events_processed?: InputMaybe<Scalars['Int']['input']>;
  start_block?: InputMaybe<Scalars['Int']['input']>;
  timestamp_caught_up_to_head_or_endblock?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Boolean expression to compare columns of type "contract_type". All fields are combined with logical 'AND'. */
export type Contract_Type_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['contract_type']['input']>;
  _gt?: InputMaybe<Scalars['contract_type']['input']>;
  _gte?: InputMaybe<Scalars['contract_type']['input']>;
  _in?: InputMaybe<Array<Scalars['contract_type']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['contract_type']['input']>;
  _lte?: InputMaybe<Scalars['contract_type']['input']>;
  _neq?: InputMaybe<Scalars['contract_type']['input']>;
  _nin?: InputMaybe<Array<Scalars['contract_type']['input']>>;
};

/** ordering argument of a cursor */
export type Cursor_Ordering =
  /** ascending ordering of the cursor */
  | 'ASC'
  /** descending ordering of the cursor */
  | 'DESC';

/** columns and relationships of "dynamic_contract_registry" */
export type Dynamic_Contract_Registry = {
  __typename?: 'dynamic_contract_registry';
  chain_id: Scalars['Int']['output'];
  contract_address: Scalars['String']['output'];
  contract_type: Scalars['contract_type']['output'];
  id: Scalars['String']['output'];
  registering_event_block_number: Scalars['Int']['output'];
  registering_event_block_timestamp: Scalars['Int']['output'];
  registering_event_contract_name: Scalars['String']['output'];
  registering_event_log_index: Scalars['Int']['output'];
  registering_event_name: Scalars['String']['output'];
  registering_event_src_address: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "dynamic_contract_registry". All fields are combined with a logical 'AND'. */
export type Dynamic_Contract_Registry_Bool_Exp = {
  _and?: InputMaybe<Array<Dynamic_Contract_Registry_Bool_Exp>>;
  _not?: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
  _or?: InputMaybe<Array<Dynamic_Contract_Registry_Bool_Exp>>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  contract_address?: InputMaybe<String_Comparison_Exp>;
  contract_type?: InputMaybe<Contract_Type_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  registering_event_block_number?: InputMaybe<Int_Comparison_Exp>;
  registering_event_block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  registering_event_contract_name?: InputMaybe<String_Comparison_Exp>;
  registering_event_log_index?: InputMaybe<Int_Comparison_Exp>;
  registering_event_name?: InputMaybe<String_Comparison_Exp>;
  registering_event_src_address?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "dynamic_contract_registry". */
export type Dynamic_Contract_Registry_Order_By = {
  chain_id?: InputMaybe<Order_By>;
  contract_address?: InputMaybe<Order_By>;
  contract_type?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  registering_event_block_number?: InputMaybe<Order_By>;
  registering_event_block_timestamp?: InputMaybe<Order_By>;
  registering_event_contract_name?: InputMaybe<Order_By>;
  registering_event_log_index?: InputMaybe<Order_By>;
  registering_event_name?: InputMaybe<Order_By>;
  registering_event_src_address?: InputMaybe<Order_By>;
};

/** select columns of table "dynamic_contract_registry" */
export type Dynamic_Contract_Registry_Select_Column =
  /** column name */
  | 'chain_id'
  /** column name */
  | 'contract_address'
  /** column name */
  | 'contract_type'
  /** column name */
  | 'id'
  /** column name */
  | 'registering_event_block_number'
  /** column name */
  | 'registering_event_block_timestamp'
  /** column name */
  | 'registering_event_contract_name'
  /** column name */
  | 'registering_event_log_index'
  /** column name */
  | 'registering_event_name'
  /** column name */
  | 'registering_event_src_address';

/** Streaming cursor of the table "dynamic_contract_registry" */
export type Dynamic_Contract_Registry_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dynamic_Contract_Registry_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dynamic_Contract_Registry_Stream_Cursor_Value_Input = {
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  contract_address?: InputMaybe<Scalars['String']['input']>;
  contract_type?: InputMaybe<Scalars['contract_type']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  registering_event_block_number?: InputMaybe<Scalars['Int']['input']>;
  registering_event_block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  registering_event_contract_name?: InputMaybe<Scalars['String']['input']>;
  registering_event_log_index?: InputMaybe<Scalars['Int']['input']>;
  registering_event_name?: InputMaybe<Scalars['String']['input']>;
  registering_event_src_address?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "end_of_block_range_scanned_data" */
export type End_Of_Block_Range_Scanned_Data = {
  __typename?: 'end_of_block_range_scanned_data';
  block_hash: Scalars['String']['output'];
  block_number: Scalars['Int']['output'];
  chain_id: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "end_of_block_range_scanned_data". All fields are combined with a logical 'AND'. */
export type End_Of_Block_Range_Scanned_Data_Bool_Exp = {
  _and?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Bool_Exp>>;
  _not?: InputMaybe<End_Of_Block_Range_Scanned_Data_Bool_Exp>;
  _or?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Bool_Exp>>;
  block_hash?: InputMaybe<String_Comparison_Exp>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "end_of_block_range_scanned_data". */
export type End_Of_Block_Range_Scanned_Data_Order_By = {
  block_hash?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
};

/** select columns of table "end_of_block_range_scanned_data" */
export type End_Of_Block_Range_Scanned_Data_Select_Column =
  /** column name */
  | 'block_hash'
  /** column name */
  | 'block_number'
  /** column name */
  | 'chain_id';

/** Streaming cursor of the table "end_of_block_range_scanned_data" */
export type End_Of_Block_Range_Scanned_Data_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: End_Of_Block_Range_Scanned_Data_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type End_Of_Block_Range_Scanned_Data_Stream_Cursor_Value_Input = {
  block_hash?: InputMaybe<Scalars['String']['input']>;
  block_number?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
};

/** columns and relationships of "event_sync_state" */
export type Event_Sync_State = {
  __typename?: 'event_sync_state';
  block_number: Scalars['Int']['output'];
  block_timestamp: Scalars['Int']['output'];
  chain_id: Scalars['Int']['output'];
  is_pre_registering_dynamic_contracts?: Maybe<Scalars['Boolean']['output']>;
  log_index: Scalars['Int']['output'];
};

/** Boolean expression to filter rows from the table "event_sync_state". All fields are combined with a logical 'AND'. */
export type Event_Sync_State_Bool_Exp = {
  _and?: InputMaybe<Array<Event_Sync_State_Bool_Exp>>;
  _not?: InputMaybe<Event_Sync_State_Bool_Exp>;
  _or?: InputMaybe<Array<Event_Sync_State_Bool_Exp>>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  is_pre_registering_dynamic_contracts?: InputMaybe<Boolean_Comparison_Exp>;
  log_index?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "event_sync_state". */
export type Event_Sync_State_Order_By = {
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  is_pre_registering_dynamic_contracts?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
};

/** select columns of table "event_sync_state" */
export type Event_Sync_State_Select_Column =
  /** column name */
  | 'block_number'
  /** column name */
  | 'block_timestamp'
  /** column name */
  | 'chain_id'
  /** column name */
  | 'is_pre_registering_dynamic_contracts'
  /** column name */
  | 'log_index';

/** Streaming cursor of the table "event_sync_state" */
export type Event_Sync_State_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Event_Sync_State_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Event_Sync_State_Stream_Cursor_Value_Input = {
  block_number?: InputMaybe<Scalars['Int']['input']>;
  block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  is_pre_registering_dynamic_contracts?: InputMaybe<Scalars['Boolean']['input']>;
  log_index?: InputMaybe<Scalars['Int']['input']>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export type Order_By =
  /** in ascending order, nulls last */
  | 'asc'
  /** in ascending order, nulls first */
  | 'asc_nulls_first'
  /** in ascending order, nulls last */
  | 'asc_nulls_last'
  /** in descending order, nulls first */
  | 'desc'
  /** in descending order, nulls first */
  | 'desc_nulls_first'
  /** in descending order, nulls last */
  | 'desc_nulls_last';

/** columns and relationships of "persisted_state" */
export type Persisted_State = {
  __typename?: 'persisted_state';
  abi_files_hash: Scalars['String']['output'];
  config_hash: Scalars['String']['output'];
  envio_version: Scalars['String']['output'];
  handler_files_hash: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  schema_hash: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "persisted_state". All fields are combined with a logical 'AND'. */
export type Persisted_State_Bool_Exp = {
  _and?: InputMaybe<Array<Persisted_State_Bool_Exp>>;
  _not?: InputMaybe<Persisted_State_Bool_Exp>;
  _or?: InputMaybe<Array<Persisted_State_Bool_Exp>>;
  abi_files_hash?: InputMaybe<String_Comparison_Exp>;
  config_hash?: InputMaybe<String_Comparison_Exp>;
  envio_version?: InputMaybe<String_Comparison_Exp>;
  handler_files_hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  schema_hash?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "persisted_state". */
export type Persisted_State_Order_By = {
  abi_files_hash?: InputMaybe<Order_By>;
  config_hash?: InputMaybe<Order_By>;
  envio_version?: InputMaybe<Order_By>;
  handler_files_hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  schema_hash?: InputMaybe<Order_By>;
};

/** select columns of table "persisted_state" */
export type Persisted_State_Select_Column =
  /** column name */
  | 'abi_files_hash'
  /** column name */
  | 'config_hash'
  /** column name */
  | 'envio_version'
  /** column name */
  | 'handler_files_hash'
  /** column name */
  | 'id'
  /** column name */
  | 'schema_hash';

/** Streaming cursor of the table "persisted_state" */
export type Persisted_State_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Persisted_State_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Persisted_State_Stream_Cursor_Value_Input = {
  abi_files_hash?: InputMaybe<Scalars['String']['input']>;
  config_hash?: InputMaybe<Scalars['String']['input']>;
  envio_version?: InputMaybe<Scalars['String']['input']>;
  handler_files_hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  schema_hash?: InputMaybe<Scalars['String']['input']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "Claims" */
  Claims: Array<Claims>;
  /** fetch data from the table: "Claims" using primary key columns */
  Claims_by_pk?: Maybe<Claims>;
  /** fetch data from the table: "Policies" */
  Policies: Array<Policies>;
  /** fetch data from the table: "Policies" using primary key columns */
  Policies_by_pk?: Maybe<Policies>;
  /** fetch data from the table: "chain_metadata" */
  chain_metadata: Array<Chain_Metadata>;
  /** fetch data from the table: "chain_metadata" using primary key columns */
  chain_metadata_by_pk?: Maybe<Chain_Metadata>;
  /** fetch data from the table: "dynamic_contract_registry" */
  dynamic_contract_registry: Array<Dynamic_Contract_Registry>;
  /** fetch data from the table: "dynamic_contract_registry" using primary key columns */
  dynamic_contract_registry_by_pk?: Maybe<Dynamic_Contract_Registry>;
  /** fetch data from the table: "end_of_block_range_scanned_data" */
  end_of_block_range_scanned_data: Array<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table: "end_of_block_range_scanned_data" using primary key columns */
  end_of_block_range_scanned_data_by_pk?: Maybe<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table: "event_sync_state" */
  event_sync_state: Array<Event_Sync_State>;
  /** fetch data from the table: "event_sync_state" using primary key columns */
  event_sync_state_by_pk?: Maybe<Event_Sync_State>;
  /** fetch data from the table: "persisted_state" */
  persisted_state: Array<Persisted_State>;
  /** fetch data from the table: "persisted_state" using primary key columns */
  persisted_state_by_pk?: Maybe<Persisted_State>;
  /** fetch data from the table: "raw_events" */
  raw_events: Array<Raw_Events>;
  /** fetch data from the table: "raw_events" using primary key columns */
  raw_events_by_pk?: Maybe<Raw_Events>;
};


export type Query_RootClaimsArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


export type Query_RootClaims_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootPoliciesArgs = {
  distinct_on?: InputMaybe<Array<Policies_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Policies_Order_By>>;
  where?: InputMaybe<Policies_Bool_Exp>;
};


export type Query_RootPolicies_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootChain_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Chain_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chain_Metadata_Order_By>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Query_RootChain_Metadata_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Query_RootDynamic_Contract_RegistryArgs = {
  distinct_on?: InputMaybe<Array<Dynamic_Contract_Registry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dynamic_Contract_Registry_Order_By>>;
  where?: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
};


export type Query_RootDynamic_Contract_Registry_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Query_RootEnd_Of_Block_Range_Scanned_DataArgs = {
  distinct_on?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Order_By>>;
  where?: InputMaybe<End_Of_Block_Range_Scanned_Data_Bool_Exp>;
};


export type Query_RootEnd_Of_Block_Range_Scanned_Data_By_PkArgs = {
  block_number: Scalars['Int']['input'];
  chain_id: Scalars['Int']['input'];
};


export type Query_RootEvent_Sync_StateArgs = {
  distinct_on?: InputMaybe<Array<Event_Sync_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Sync_State_Order_By>>;
  where?: InputMaybe<Event_Sync_State_Bool_Exp>;
};


export type Query_RootEvent_Sync_State_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Query_RootPersisted_StateArgs = {
  distinct_on?: InputMaybe<Array<Persisted_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Persisted_State_Order_By>>;
  where?: InputMaybe<Persisted_State_Bool_Exp>;
};


export type Query_RootPersisted_State_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootRaw_EventsArgs = {
  distinct_on?: InputMaybe<Array<Raw_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Raw_Events_Order_By>>;
  where?: InputMaybe<Raw_Events_Bool_Exp>;
};


export type Query_RootRaw_Events_By_PkArgs = {
  serial: Scalars['Int']['input'];
};

/** columns and relationships of "raw_events" */
export type Raw_Events = {
  __typename?: 'raw_events';
  block_fields: Scalars['jsonb']['output'];
  block_hash: Scalars['String']['output'];
  block_number: Scalars['Int']['output'];
  block_timestamp: Scalars['Int']['output'];
  chain_id: Scalars['Int']['output'];
  contract_name: Scalars['String']['output'];
  db_write_timestamp?: Maybe<Scalars['timestamp']['output']>;
  event_id: Scalars['numeric']['output'];
  event_name: Scalars['String']['output'];
  log_index: Scalars['Int']['output'];
  params: Scalars['jsonb']['output'];
  serial: Scalars['Int']['output'];
  src_address: Scalars['String']['output'];
  transaction_fields: Scalars['jsonb']['output'];
};


/** columns and relationships of "raw_events" */
export type Raw_EventsBlock_FieldsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "raw_events" */
export type Raw_EventsParamsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "raw_events" */
export type Raw_EventsTransaction_FieldsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "raw_events". All fields are combined with a logical 'AND'. */
export type Raw_Events_Bool_Exp = {
  _and?: InputMaybe<Array<Raw_Events_Bool_Exp>>;
  _not?: InputMaybe<Raw_Events_Bool_Exp>;
  _or?: InputMaybe<Array<Raw_Events_Bool_Exp>>;
  block_fields?: InputMaybe<Jsonb_Comparison_Exp>;
  block_hash?: InputMaybe<String_Comparison_Exp>;
  block_number?: InputMaybe<Int_Comparison_Exp>;
  block_timestamp?: InputMaybe<Int_Comparison_Exp>;
  chain_id?: InputMaybe<Int_Comparison_Exp>;
  contract_name?: InputMaybe<String_Comparison_Exp>;
  db_write_timestamp?: InputMaybe<Timestamp_Comparison_Exp>;
  event_id?: InputMaybe<Numeric_Comparison_Exp>;
  event_name?: InputMaybe<String_Comparison_Exp>;
  log_index?: InputMaybe<Int_Comparison_Exp>;
  params?: InputMaybe<Jsonb_Comparison_Exp>;
  serial?: InputMaybe<Int_Comparison_Exp>;
  src_address?: InputMaybe<String_Comparison_Exp>;
  transaction_fields?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** Ordering options when selecting data from "raw_events". */
export type Raw_Events_Order_By = {
  block_fields?: InputMaybe<Order_By>;
  block_hash?: InputMaybe<Order_By>;
  block_number?: InputMaybe<Order_By>;
  block_timestamp?: InputMaybe<Order_By>;
  chain_id?: InputMaybe<Order_By>;
  contract_name?: InputMaybe<Order_By>;
  db_write_timestamp?: InputMaybe<Order_By>;
  event_id?: InputMaybe<Order_By>;
  event_name?: InputMaybe<Order_By>;
  log_index?: InputMaybe<Order_By>;
  params?: InputMaybe<Order_By>;
  serial?: InputMaybe<Order_By>;
  src_address?: InputMaybe<Order_By>;
  transaction_fields?: InputMaybe<Order_By>;
};

/** select columns of table "raw_events" */
export type Raw_Events_Select_Column =
  /** column name */
  | 'block_fields'
  /** column name */
  | 'block_hash'
  /** column name */
  | 'block_number'
  /** column name */
  | 'block_timestamp'
  /** column name */
  | 'chain_id'
  /** column name */
  | 'contract_name'
  /** column name */
  | 'db_write_timestamp'
  /** column name */
  | 'event_id'
  /** column name */
  | 'event_name'
  /** column name */
  | 'log_index'
  /** column name */
  | 'params'
  /** column name */
  | 'serial'
  /** column name */
  | 'src_address'
  /** column name */
  | 'transaction_fields';

/** Streaming cursor of the table "raw_events" */
export type Raw_Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Raw_Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Raw_Events_Stream_Cursor_Value_Input = {
  block_fields?: InputMaybe<Scalars['jsonb']['input']>;
  block_hash?: InputMaybe<Scalars['String']['input']>;
  block_number?: InputMaybe<Scalars['Int']['input']>;
  block_timestamp?: InputMaybe<Scalars['Int']['input']>;
  chain_id?: InputMaybe<Scalars['Int']['input']>;
  contract_name?: InputMaybe<Scalars['String']['input']>;
  db_write_timestamp?: InputMaybe<Scalars['timestamp']['input']>;
  event_id?: InputMaybe<Scalars['numeric']['input']>;
  event_name?: InputMaybe<Scalars['String']['input']>;
  log_index?: InputMaybe<Scalars['Int']['input']>;
  params?: InputMaybe<Scalars['jsonb']['input']>;
  serial?: InputMaybe<Scalars['Int']['input']>;
  src_address?: InputMaybe<Scalars['String']['input']>;
  transaction_fields?: InputMaybe<Scalars['jsonb']['input']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "Claims" */
  Claims: Array<Claims>;
  /** fetch data from the table: "Claims" using primary key columns */
  Claims_by_pk?: Maybe<Claims>;
  /** fetch data from the table in a streaming manner: "Claims" */
  Claims_stream: Array<Claims>;
  /** fetch data from the table: "Policies" */
  Policies: Array<Policies>;
  /** fetch data from the table: "Policies" using primary key columns */
  Policies_by_pk?: Maybe<Policies>;
  /** fetch data from the table in a streaming manner: "Policies" */
  Policies_stream: Array<Policies>;
  /** fetch data from the table: "chain_metadata" */
  chain_metadata: Array<Chain_Metadata>;
  /** fetch data from the table: "chain_metadata" using primary key columns */
  chain_metadata_by_pk?: Maybe<Chain_Metadata>;
  /** fetch data from the table in a streaming manner: "chain_metadata" */
  chain_metadata_stream: Array<Chain_Metadata>;
  /** fetch data from the table: "dynamic_contract_registry" */
  dynamic_contract_registry: Array<Dynamic_Contract_Registry>;
  /** fetch data from the table: "dynamic_contract_registry" using primary key columns */
  dynamic_contract_registry_by_pk?: Maybe<Dynamic_Contract_Registry>;
  /** fetch data from the table in a streaming manner: "dynamic_contract_registry" */
  dynamic_contract_registry_stream: Array<Dynamic_Contract_Registry>;
  /** fetch data from the table: "end_of_block_range_scanned_data" */
  end_of_block_range_scanned_data: Array<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table: "end_of_block_range_scanned_data" using primary key columns */
  end_of_block_range_scanned_data_by_pk?: Maybe<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table in a streaming manner: "end_of_block_range_scanned_data" */
  end_of_block_range_scanned_data_stream: Array<End_Of_Block_Range_Scanned_Data>;
  /** fetch data from the table: "event_sync_state" */
  event_sync_state: Array<Event_Sync_State>;
  /** fetch data from the table: "event_sync_state" using primary key columns */
  event_sync_state_by_pk?: Maybe<Event_Sync_State>;
  /** fetch data from the table in a streaming manner: "event_sync_state" */
  event_sync_state_stream: Array<Event_Sync_State>;
  /** fetch data from the table: "persisted_state" */
  persisted_state: Array<Persisted_State>;
  /** fetch data from the table: "persisted_state" using primary key columns */
  persisted_state_by_pk?: Maybe<Persisted_State>;
  /** fetch data from the table in a streaming manner: "persisted_state" */
  persisted_state_stream: Array<Persisted_State>;
  /** fetch data from the table: "raw_events" */
  raw_events: Array<Raw_Events>;
  /** fetch data from the table: "raw_events" using primary key columns */
  raw_events_by_pk?: Maybe<Raw_Events>;
  /** fetch data from the table in a streaming manner: "raw_events" */
  raw_events_stream: Array<Raw_Events>;
};


export type Subscription_RootClaimsArgs = {
  distinct_on?: InputMaybe<Array<Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Claims_Order_By>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


export type Subscription_RootClaims_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootClaims_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Claims_Stream_Cursor_Input>>;
  where?: InputMaybe<Claims_Bool_Exp>;
};


export type Subscription_RootPoliciesArgs = {
  distinct_on?: InputMaybe<Array<Policies_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Policies_Order_By>>;
  where?: InputMaybe<Policies_Bool_Exp>;
};


export type Subscription_RootPolicies_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootPolicies_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Policies_Stream_Cursor_Input>>;
  where?: InputMaybe<Policies_Bool_Exp>;
};


export type Subscription_RootChain_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Chain_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Chain_Metadata_Order_By>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Subscription_RootChain_Metadata_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Subscription_RootChain_Metadata_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Chain_Metadata_Stream_Cursor_Input>>;
  where?: InputMaybe<Chain_Metadata_Bool_Exp>;
};


export type Subscription_RootDynamic_Contract_RegistryArgs = {
  distinct_on?: InputMaybe<Array<Dynamic_Contract_Registry_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Dynamic_Contract_Registry_Order_By>>;
  where?: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
};


export type Subscription_RootDynamic_Contract_Registry_By_PkArgs = {
  id: Scalars['String']['input'];
};


export type Subscription_RootDynamic_Contract_Registry_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Dynamic_Contract_Registry_Stream_Cursor_Input>>;
  where?: InputMaybe<Dynamic_Contract_Registry_Bool_Exp>;
};


export type Subscription_RootEnd_Of_Block_Range_Scanned_DataArgs = {
  distinct_on?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<End_Of_Block_Range_Scanned_Data_Order_By>>;
  where?: InputMaybe<End_Of_Block_Range_Scanned_Data_Bool_Exp>;
};


export type Subscription_RootEnd_Of_Block_Range_Scanned_Data_By_PkArgs = {
  block_number: Scalars['Int']['input'];
  chain_id: Scalars['Int']['input'];
};


export type Subscription_RootEnd_Of_Block_Range_Scanned_Data_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<End_Of_Block_Range_Scanned_Data_Stream_Cursor_Input>>;
  where?: InputMaybe<End_Of_Block_Range_Scanned_Data_Bool_Exp>;
};


export type Subscription_RootEvent_Sync_StateArgs = {
  distinct_on?: InputMaybe<Array<Event_Sync_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Event_Sync_State_Order_By>>;
  where?: InputMaybe<Event_Sync_State_Bool_Exp>;
};


export type Subscription_RootEvent_Sync_State_By_PkArgs = {
  chain_id: Scalars['Int']['input'];
};


export type Subscription_RootEvent_Sync_State_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Event_Sync_State_Stream_Cursor_Input>>;
  where?: InputMaybe<Event_Sync_State_Bool_Exp>;
};


export type Subscription_RootPersisted_StateArgs = {
  distinct_on?: InputMaybe<Array<Persisted_State_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Persisted_State_Order_By>>;
  where?: InputMaybe<Persisted_State_Bool_Exp>;
};


export type Subscription_RootPersisted_State_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootPersisted_State_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Persisted_State_Stream_Cursor_Input>>;
  where?: InputMaybe<Persisted_State_Bool_Exp>;
};


export type Subscription_RootRaw_EventsArgs = {
  distinct_on?: InputMaybe<Array<Raw_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Raw_Events_Order_By>>;
  where?: InputMaybe<Raw_Events_Bool_Exp>;
};


export type Subscription_RootRaw_Events_By_PkArgs = {
  serial: Scalars['Int']['input'];
};


export type Subscription_RootRaw_Events_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Raw_Events_Stream_Cursor_Input>>;
  where?: InputMaybe<Raw_Events_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};
