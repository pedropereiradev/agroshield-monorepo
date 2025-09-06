library;

use std::string::String;
use sway_libs::signed_integers::*;

abi Constructor {
    #[storage(read, write)]
    fn constructor(owner: Address, nft_id: ContractId, manager_id: ContractId);
}

abi OwnersContract {
    #[storage(read, write)]
    fn transfer_ownership(new_owner: Address);
    #[storage(read)]
    fn transfer_funds(amount: u64, asset_id: AssetId, recipient: Address);
}

abi Insurance {
    #[storage(read, write), payable]
    fn create_insurance(
        crop: String,
        region_x: u64,
        region_y: u64,
        insured_value: u64,
        premium: u64,
        policy_type: PolicyType,
        insured_area: u64,
        insured_area_unit: String,
        planting_month: u64,
        harvest_month: u64,
    );

    #[storage(read)]
    fn request_claim(asset_id: AssetId);

    #[storage(read)]
    fn approve_claim(asset_id: AssetId);

    #[storage(read)]
    fn reject_claim(asset_id: AssetId);
}

abi ManagerInfo {
    #[storage(read)]
    fn get_policy(policy_id: AssetId) -> Option<PolicyData>;

    #[storage(read)]
    fn get_policy_count() -> u64;
}
abi Manager {
    #[storage(read, write)]
    fn register_policy(policy_id: AssetId, data: PolicyData);

    #[storage(read)]
    fn request_claim(policy_id: AssetId);

    #[storage(read)]
    fn approve_claim(policy_id: AssetId);

    #[storage(read)]
    fn reject_claim(policy_id: AssetId);
}

pub struct PolicyData {
    pub owner: Identity,
    pub insured_value: u64,
    pub premium: u64,
    pub timestamp: u64,
    pub policy_type: PolicyType,
    pub status: Status,
}

pub enum PolicyType {
    Rainfall: (),
    Temperature: (),
    Drought: (),
}

pub enum Status {
    Active: (),
    Claimed: (),
    Expired: (),
    Approved: (),
    Rejected: (),
}
