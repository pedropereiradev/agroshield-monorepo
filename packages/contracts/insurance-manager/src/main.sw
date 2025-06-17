contract;

pub mod interface;
mod events;

use interface::{Admin, Constructor, Manager, ManagerInfo, PolicyData, PolicyError};
use events::RegisterPolicyEvent;
use standards::src5::{SRC5, State};
use sway_libs::ownership::{_owner, initialize_ownership, only_owner, transfer_ownership};
use sway_libs::admin::{add_admin, is_admin, revoke_admin};
use std::hash::sha256;
use std::block::timestamp;
use std::string::String;
storage {
    policies: StorageMap<AssetId, PolicyData> = StorageMap {},
    owner_policy_count: StorageMap<Identity, u64> = StorageMap {},
    owner_policy_at_index: StorageMap<(Identity, u64), AssetId> = StorageMap {},
    policy_owners: StorageMap<AssetId, Identity> = StorageMap {},
    policy_count: u64 = 0,
}
#[storage(read)]
// fn only_owner_or_admin() {
//     let sender = msg_sender().unwrap();
//     let owner = _owner();

//     require(
//         owner != State::Uninitialized,
//         PolicyError::ContractNotInitialized,
//     );

//     require(
//         owner == State::Initialized(sender) || is_admin(sender),
//         PolicyError::OnlyOwnerOrAdmin,
//     );
// }

impl Constructor for Contract {
    #[storage(read, write)]
    fn constructor(owner: Identity, admin: Identity) {
        initialize_ownership(owner);
        add_admin(admin);
    }
}
impl Admin for Contract {
    #[storage(read, write)]
    fn revoke_admin(admin: Identity) {
        only_owner();
        revoke_admin(admin);
    }
    #[storage(read, write)]
    fn add_admin(admin: Identity) {
        only_owner();
        add_admin(admin);
    }
    #[storage(read, write)]
    fn transfer_ownership(new_owner: Identity) {
        only_owner();
        transfer_ownership(new_owner);
    }
}
impl Manager for Contract {
    #[storage(read, write)]
    fn register_policy(policy_id: AssetId, data: PolicyData) {
        // only_owner_or_admin();
        let owner = data.owner;
        storage.policies.insert(policy_id, data);
        storage.policy_owners.insert(policy_id, owner);
        let current_count = match storage.owner_policy_count.get(owner).try_read() {
            Some(count) => count,
            None => 0,
        };
        storage
            .owner_policy_at_index
            .insert((owner, current_count), policy_id);
        storage.owner_policy_count.insert(owner, current_count + 1);
        storage.policy_count.write(storage.policy_count.read() + 1);
        log(RegisterPolicyEvent {
            owner: owner,
            policy_id: policy_id,
            insured_value: data.insured_value,
            premium: data.premium,
            start_date: data.start_date,
            end_date: data.end_date,
            policy_type: data.policy_type,
            status: data.status,
            timestamp: timestamp(),
        });
    }
}
impl ManagerInfo for Contract {
    #[storage(read)]
    fn get_policy(policy_id: AssetId) -> Option<PolicyData> {
        storage.policies.get(policy_id).try_read()
    }
    #[storage(read)]
    fn get_policy_count() -> u64 {
        storage.policy_count.read()
    }
    #[storage(read)]
    fn get_policies_by_owner(owner: Identity) -> Vec<AssetId> {
        let count = match storage.owner_policy_count.get(owner).try_read() {
            Some(c) => c,
            None => 0,
        };
        let mut policies = Vec::new();
        let mut i = 0;
        while i < count {
            match storage.owner_policy_at_index.get((owner, i)).try_read() {
                Some(policy_id) => policies.push(policy_id),
                None => {},
            }
            i += 1;
        }
        policies
    }
    #[storage(read)]
    fn get_owner_policy_count(owner: Identity) -> u64 {
        match storage.owner_policy_count.get(owner).try_read() {
            Some(count) => count,
            None => 0,
        }
    }
}
impl SRC5 for Contract {
    #[storage(read)]
    fn owner() -> State {
        _owner()
    }
}
