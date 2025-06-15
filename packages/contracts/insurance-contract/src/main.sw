contract;

mod interface;
mod errors;
mod lib;

use interface::{
    Constructor,
    Insurance,
    Manager,
    ManagerInfo,
    OwnersContract,
    PolicyData,
    PolicyType,
    Status,
};
use errors::InsuranceContractError;
use lib::{generate_name, generate_sub_id};
use standards::src5::{SRC5, State};
use standards::src20::SRC20;
use sway_libs::ownership::{_owner, initialize_ownership, only_owner, transfer_ownership};
use sway_libs::pausable::*;
use std::context::this_balance;
use std::asset::transfer;
// use sway_libs::signed_integers::u64::I64;
use std::string::String;
use standards::src3::SRC3;
use standards::src7::Metadata;
use sway_libs::asset::base::SetAssetAttributes;
use sway_libs::asset::metadata::SetAssetMetadata;
use std::hash::sha256;
storage {
    nft_id: ContractId = ContractId::zero(),
    manager_id: ContractId = ContractId::zero(),
}
#[storage(read, write)]
fn mint_token(
    crop: String,
    start_date: u64,
    end_date: u64,
    region_x: u64,
    region_y: u64,
    insured_value: u64,
    premium: u64,
    policy_type: PolicyType,
    insured_area: u64,
    insured_area_unit: String,
    planting_month: u64,
    harvest_month: u64,
    receiver: Identity,
) -> AssetId {
    let policy_type_str = policy_type_to_string(policy_type);
    let sub_id = generate_sub_id(
        crop,
        start_date,
        end_date,
        region_x,
        region_y,
        policy_type_str,
    );
    let nft_id = storage.nft_id.read();
    let asset_id = AssetId::new(nft_id, sub_id);
    let src3_contract = abi(SRC3, nft_id.into());
    src3_contract.mint(receiver, Some(sub_id), 1);
    let nft_contract = abi(SetAssetMetadata, nft_id.into());
    nft_contract.set_metadata(
        asset_id,
        String::from_ascii_str("crop"),
        Metadata::String(crop),
    );
    nft_contract.set_metadata(
        asset_id,
        String::from_ascii_str("start_date"),
        Metadata::Int(start_date),
    );
    nft_contract.set_metadata(
        asset_id,
        String::from_ascii_str("end_date"),
        Metadata::Int(end_date),
    );
    nft_contract.set_metadata(
        asset_id,
        String::from_ascii_str("region_x"),
        Metadata::Int(region_x),
    );
    nft_contract.set_metadata(
        asset_id,
        String::from_ascii_str("region_y"),
        Metadata::Int(region_y),
    );
    nft_contract.set_metadata(
        asset_id,
        String::from_ascii_str("insured_value"),
        Metadata::Int(insured_value),
    );
    nft_contract.set_metadata(
        asset_id,
        String::from_ascii_str("premium"),
        Metadata::Int(premium),
    );
    nft_contract.set_metadata(
        asset_id,
        String::from_ascii_str("policy_type"),
        Metadata::String(policy_type_str),
    );
    nft_contract.set_metadata(
        asset_id,
        String::from_ascii_str("insured_area"),
        Metadata::Int(insured_area),
    );
    nft_contract.set_metadata(
        asset_id,
        String::from_ascii_str("insured_area_unit"),
        Metadata::String(insured_area_unit),
    );
    nft_contract.set_metadata(
        asset_id,
        String::from_ascii_str("planting_month"),
        Metadata::Int(planting_month),
    );
    nft_contract.set_metadata(
        asset_id,
        String::from_ascii_str("harvest_month"),
        Metadata::Int(harvest_month),
    );
    nft_contract.set_metadata(
        asset_id,
        String::from_ascii_str("image:png"),
        Metadata::String(String::from_ascii_str(
            "https://teal-solid-flamingo-658.mypinata.cloud/ipfs/bafybeia5kl72ixc2bvb7ykqyf7mqmy2iso7ghm4ajfccvidincpm2lxfny",
        )),
    );
    let nft_contract = abi(SetAssetAttributes, nft_id.into());
    let name = generate_name(crop, policy_type_str);
    nft_contract.set_name(asset_id, name);

    asset_id
}

pub fn policy_type_to_string(policy_type: PolicyType) -> String {
    match policy_type {
        PolicyType::Rainfall => String::from_ascii_str("Rainfall"),
        PolicyType::Temperature => String::from_ascii_str("Temperature"),
        PolicyType::Drought => String::from_ascii_str("Drought"),
    }
}

impl Insurance for Contract {
    #[storage(read, write), payable]
    fn create_insurance(
        crop: String,
        start_date: u64,
        end_date: u64,
        region_x: u64,
        region_y: u64,
        insured_value: u64,
        premium: u64,
        policy_type: PolicyType,
        insured_area: u64,
        insured_area_unit: String,
        planting_month: u64,
        harvest_month: u64,
    ) {
        require_not_paused();

        let owner = msg_sender().unwrap();

        let asset_id = mint_token(
            crop,
            start_date,
            end_date,
            region_x,
            region_y,
            insured_value,
            premium,
            policy_type,
            insured_area,
            insured_area_unit,
            planting_month,
            harvest_month,
            owner,
        );

        let manager_id = storage.manager_id.read();
        let manager = abi(Manager, manager_id.into());

        manager.register_policy(
            asset_id,
            PolicyData {
                owner,
                insured_value,
                premium,
                start_date,
                end_date,
                policy_type,
                status: Status::Active,
            },
        )
    }
}
impl Constructor for Contract {
    #[storage(read, write)]
    fn constructor(owner: Address, nft_id: ContractId, manager_id: ContractId) {
        initialize_ownership(Identity::Address(owner));

        require(
            manager_id != ContractId::zero(),
            InsuranceContractError::ContractNotBeZero,
        );
        require(
            nft_id != ContractId::zero(),
            InsuranceContractError::ContractNotBeZero,
        );

        let nft_contract_id = storage.nft_id.read();
        require(
            nft_contract_id == ContractId::zero(),
            InsuranceContractError::ContractAlreadyInitialized,
        );

        let manager_contract_id = storage.manager_id.read();
        require(
            manager_contract_id == ContractId::zero(),
            InsuranceContractError::ContractAlreadyInitialized,
        );

        storage.nft_id.write(nft_id);
        storage.manager_id.write(manager_id);
    }
}
impl OwnersContract for Contract {
    #[storage(read, write)]
    fn transfer_ownership(new_owner: Address) {
        only_owner();
        transfer_ownership(Identity::Address(new_owner));
    }
    #[storage(read)]
    fn transfer_funds(amount: u64, asset_id: AssetId, recipient: Address) {
        only_owner();
        let total_balance = this_balance(asset_id);
        require(
            total_balance >= amount,
            InsuranceContractError::InvalidAmount,
        );
        transfer(Identity::Address(recipient), AssetId::base(), amount);
    }
}
impl SRC5 for Contract {
    #[storage(read)]
    fn owner() -> State {
        _owner()
    }
}
impl Pausable for Contract {
    #[storage(write)]
    fn pause() {
        only_owner();
        _pause();
    }
    #[storage(write)]
    fn unpause() {
        only_owner();
        _unpause();
    }
    #[storage(read)]
    fn is_paused() -> bool {
        _is_paused()
    }
}
