contract;

mod interface;
mod errors;

use interface::{Constructor, OwnersContract};
use errors::InsuranceContractError;
use standards::src5::{SRC5, State};
use sway_libs::ownership::{_owner, initialize_ownership, only_owner, transfer_ownership};
use sway_libs::pausable::*;
use std::context::this_balance;
use std::asset::transfer;
storage {
    nft_id: ContractId = ContractId::zero(),
}

impl Constructor for Contract {
    #[storage(read, write)]
    fn constructor(owner: Address, nft_id: ContractId) {
        initialize_ownership(Identity::Address(owner));
        require(
            nft_id != ContractId::zero(),
            InsuranceContractError::ContractNotBeZero,
        );
        let contract_id = storage.nft_id.read();
        require(
            contract_id == ContractId::zero(),
            InsuranceContractError::ContractAlreadyInitialized,
        );
        storage.nft_id.write(nft_id);
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
