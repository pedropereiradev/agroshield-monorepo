contract;

mod errors;
mod interface;

use errors::{MintError, SetError};
use interface::{Admin, Constructor};
use standards::{src20::SRC20, src3::SRC3, src5::{SRC5, State}, src7::{Metadata, SRC7}};
use sway_libs::{
    admin::{
        add_admin,
        only_admin,
        revoke_admin,
    },
    asset::{
        base::{
            _name,
            _set_name,
            _total_assets,
            _total_supply,
            SetAssetAttributes,
        },
        metadata::*,
        supply::{
            _burn,
            _mint,
        },
    },
    ownership::{
        _owner,
        initialize_ownership,
        only_owner,
    },
    pausable::{
        _is_paused,
        _pause,
        _unpause,
        Pausable,
        require_not_paused,
    },
};
use std::{hash::Hash, storage::storage_string::*, string::String};

configurable {
    DECIMALS: u8 = 0u8,
    SYMBOL: str[4] = __to_str_array("AGRO"),
}

storage {
    total_assets: u64 = 0,
    total_supply: StorageMap<AssetId, u64> = StorageMap {},
    name: StorageMap<AssetId, StorageString> = StorageMap {},
    metadata: StorageMetadata = StorageMetadata {},
}
impl SRC20 for Contract {
    #[storage(read)]
    fn total_assets() -> u64 {
        _total_assets(storage.total_assets)
    }
    #[storage(read)]
    fn total_supply(asset_id: AssetId) -> Option<u64> {
        _total_supply(storage.total_supply, asset_id)
    }
    #[storage(read)]
    fn name(asset_id: AssetId) -> Option<String> {
        _name(storage.name, asset_id)
    }
    #[storage(read)]
    fn symbol(asset_id: AssetId) -> Option<String> {
        if asset_id == AssetId::default() {
            Some(String::from_ascii_str(from_str_array(SYMBOL)))
        } else {
            None
        }
    }
    #[storage(read)]
    fn decimals(_asset_id: AssetId) -> Option<u8> {
        Some(DECIMALS)
    }
}

impl SRC3 for Contract {
    #[storage(read, write)]
    fn mint(recipient: Identity, sub_id: Option<SubId>, amount: u64) {
        require_not_paused();
        // only_admin();
        require(sub_id.is_some(), MintError::SubIdCannotBeNone);
        let sub_id = sub_id.unwrap();
        let asset = AssetId::new(ContractId::this(), sub_id);
        require(amount == 1, MintError::CannotMintMoreThanOneNFTWithSubId);
        require(
            storage
                .total_supply
                .get(asset)
                .try_read()
                .is_none(),
            MintError::NFTAlreadyMinted,
        );
        let _ = _mint(
            storage
                .total_assets,
            storage
                .total_supply,
            recipient,
            sub_id,
            amount,
        );
    }
    #[payable]
    #[storage(read, write)]
    fn burn(sub_id: SubId, amount: u64) {
        require_not_paused();
        // only_admin();
        _burn(storage.total_supply, sub_id, amount);
    }
}
impl SRC7 for Contract {
    #[storage(read)]
    fn metadata(asset_id: AssetId, key: String) -> Option<Metadata> {
        storage.metadata.get(asset_id, key)
    }
}

impl SRC5 for Contract {
    #[storage(read)]
    fn owner() -> State {
        _owner()
    }
}

impl SetAssetAttributes for Contract {
    #[storage(write)]
    fn set_name(asset_id: AssetId, name: String) {
        // only_owner();
        require(
            storage
                .name
                .get(asset_id)
                .read_slice()
                .is_none(),
            SetError::ValueAlreadySet,
        );
        _set_name(storage.name, asset_id, name);
    }
    #[storage(write)]
    fn set_symbol(_asset_id: AssetId, _symbol: String) {
        require(false, SetError::ValueAlreadySet);
    }
    #[storage(write)]
    fn set_decimals(_asset_id: AssetId, _decimals: u8) {
        require(false, SetError::ValueAlreadySet);
    }
}
impl SetAssetMetadata for Contract {
    #[storage(read, write)]
    fn set_metadata(asset_id: AssetId, key: String, metadata: Metadata) {
        // only_owner();
        require(
            storage
                .metadata
                .get(asset_id, key)
                .is_none(),
            SetError::ValueAlreadySet,
        );
        _set_metadata(storage.metadata, asset_id, key, metadata);
    }
}
impl Pausable for Contract {
    #[storage(write)]
    fn pause() {
        only_owner();
        _pause();
    }
    #[storage(read)]
    fn is_paused() -> bool {
        _is_paused()
    }
    #[storage(write)]
    fn unpause() {
        only_owner();
        _unpause();
    }
}

impl Constructor for Contract {
    #[storage(read, write)]
    fn constructor(owner: Identity, admin: Identity) {
        initialize_ownership(owner);
        add_admin(admin);
    }
}

impl Admin for Contract {
    #[storage(read, write)]
    fn add_admin(admin: Identity) {
        only_owner();
        add_admin(admin);
    }
    #[storage(read, write)]
    fn revoke_admin(admin: Identity) {
        only_owner();
        revoke_admin(admin);
    }
}
