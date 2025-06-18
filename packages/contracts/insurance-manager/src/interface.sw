library;

use std::string::String;

abi Constructor {
    #[storage(read, write)]
    fn constructor(owner: Identity, admin: Identity);
}

abi Admin {
    #[storage(read, write)]
    fn revoke_admin(admin: Identity);

    #[storage(read, write)]
    fn add_admin(admin: Identity);

    #[storage(read, write)]
    fn transfer_ownership(new_owner: Identity);
}

abi Manager {
    #[storage(read, write)]
    fn register_policy(policy_id: AssetId, data: PolicyData);
}

abi ManagerInfo {
    #[storage(read)]
    fn get_policy(policy_id: AssetId) -> Option<PolicyData>;

    #[storage(read)]
    fn get_policy_count() -> u64;

    #[storage(read)]
    fn get_policies_by_owner(owner: Identity) -> Vec<AssetId>;

    #[storage(read)]
    fn get_owner_policy_count(owner: Identity) -> u64;
}

pub struct PolicyData {
    pub owner: Identity,
    pub insured_value: u64,
    pub premium: u64,
    pub start_date: u64,
    pub end_date: u64,
    pub policy_type: PolicyType,
    pub status: Status,
}

pub enum PolicyError {
    ContractNotInitialized: (),
    OnlyOwnerOrAdmin: (),
}

pub enum PolicyType {
    Rainfall: (),
    Temperature: (),
    Drought: (),
}

pub enum Status {
    Active: (),
    Inactive: (),
    Claimed: (),
    Expired: (),
    Pending: (),
    Approved: (),
    Rejected: (),
    Suspended: (),
    UnderReview: (),
}
