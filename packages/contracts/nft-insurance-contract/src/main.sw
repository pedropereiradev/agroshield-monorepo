contract;

//  @todo - Adicionar
mod errors;
mod interface;

use errors::{MintError, SetError};
use interface::Constructor;
use standards::{src20::SRC20, src3::SRC3, src5::{SRC5, State}, src7::{Metadata, SRC7}};
use sway_libs::{
    asset::{
        base::{
            _name,
            _set_name,
            _set_symbol,
            _symbol,
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
use std::{constants::DEFAULT_SUB_ID, hash::Hash, storage::storage_string::*, string::String};

storage {
    total_assets: u64 = 0,
    total_supply: StorageMap<AssetId, u64> = StorageMap {},
    name: StorageMap<AssetId, StorageString> = StorageMap {},
    symbol: StorageMap<AssetId, StorageString> = StorageMap {},
    metadata: StorageMetadata = StorageMetadata {},
}

configurable {
    MAX_SUPPLY: u64 = 3,
}

impl SRC20 for Contract {
    #[storage(read)]
    fn total_assets() -> u64 {
        _total_assets(storage.total_assets)
    }

    #[storage(read)]
    fn total_supply(asset: AssetId) -> Option<u64> {
        _total_supply(storage.total_supply, asset)
    }

    #[storage(read)]
    fn name(asset: AssetId) -> Option<String> {
        _name(storage.name, asset)
    }

    #[storage(read)]
    fn symbol(asset: AssetId) -> Option<String> {
        _symbol(storage.symbol, asset)
    }

    #[storage(read)]
    fn decimals(_asset: AssetId) -> Option<u8> {
        Some(0u8)
    }
}

impl SRC3 for Contract {
    #[storage(read, write)]
    fn mint(recipient: Identity, sub_id: Option<SubId>, amount: u64) {
        require_not_paused();

        let sub_id = match sub_id {
            Some(s) => s,
            None => DEFAULT_SUB_ID,
        };

        // Checks to ensure this is a valid mint.
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
        require(
            storage
                .total_assets
                .try_read()
                .unwrap_or(0) + amount <= MAX_SUPPLY,
            MintError::MaxNFTsMinted,
        );

        // Mint the NFT
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
        _burn(storage.total_supply, sub_id, amount);
    }
}

impl SRC7 for Contract {
    #[storage(read)]
    fn metadata(asset: AssetId, key: String) -> Option<Metadata> {
        storage.metadata.get(asset, key)
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
    fn set_name(asset: AssetId, name: String) {
        only_owner();
        require(
            storage
                .name
                .get(asset)
                .read_slice()
                .is_none(),
            SetError::ValueAlreadySet,
        );
        _set_name(storage.name, asset, name);
    }

    #[storage(write)]
    fn set_symbol(asset: AssetId, symbol: String) {
        only_owner();
        require(
            storage
                .symbol
                .get(asset)
                .read_slice()
                .is_none(),
            SetError::ValueAlreadySet,
        );
        _set_symbol(storage.symbol, asset, symbol);
    }

    #[storage(write)]
    fn set_decimals(_asset: AssetId, _decimals: u8) {
        require(false, SetError::ValueAlreadySet);
    }
}

impl SetAssetMetadata for Contract {
    #[storage(read, write)]
    fn set_metadata(asset: AssetId, key: String, metadata: Metadata) {
        require(
            storage
                .metadata
                .get(asset, key)
                .is_none(),
            SetError::ValueAlreadySet,
        );
        _set_metadata(storage.metadata, asset, key, metadata);
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
    fn constructor(owner: Identity) {
        initialize_ownership(owner);
    }
}
