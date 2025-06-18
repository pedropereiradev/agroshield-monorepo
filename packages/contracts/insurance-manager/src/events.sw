library;

use ::interface::{PolicyData, PolicyType, Status};

pub struct RegisterPolicyEvent {
    pub owner: Identity,
    pub policy_id: AssetId,
    pub insured_value: u64,
    pub premium: u64,
    pub start_date: u64,
    pub end_date: u64,
    pub policy_type: PolicyType,
    pub status: Status,
    pub timestamp: u64,
}
