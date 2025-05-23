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
        start_date: String,
        end_date: String,
        region_x: u64,
        region_y: u64,
        insured_value: u64,
        premium: u64,
        policy_type: String,
        insured_area: u64,
        insured_area_unit: String,
        planting_month: u64,
        harvest_month: u64,
    );
}
