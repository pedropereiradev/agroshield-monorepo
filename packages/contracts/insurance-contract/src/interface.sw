library;

use std::string::String;
use sway_libs::signed_integers::*;

abi Constructor {
    #[storage(read, write)]
    fn constructor(owner: Address, nft_id: ContractId);
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
        season: String,
        start_date: String,
        duration_days: u64,
        region_x: u64,
        region_y: u64,
        insured_value: u64,
        premium: u64,
        policy_type: String,
        expiry_date: String,
        insured_area: u64,
        insured_area_unit: String,
    );
}
