contract;

mod errors;
mod interface;

use errors::{MintError, SetError};
use interface::{Constructor};
use standards::{src20::SRC20, src3::SRC3, src5::{SRC5, State}, src7::{SRC7, Metadata}};
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
use std::{hash::Hash, storage::storage_string::*, string::String}

storage {

}

impl SRC20 for Contract {}

impl SRC3 for Contract {}

impl SRC7 for Contract {}

impl SRC5 for Contract {}

impl SetAssetAttributes for Contract {}

impl SetAssetMetadata for Contract {}

impl Pausable for Contract {}

impl Constructor for Contract {}