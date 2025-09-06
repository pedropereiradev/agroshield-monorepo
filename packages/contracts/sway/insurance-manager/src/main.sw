contract;

pub mod interface;
mod events;
mod errors;

use interface::{Admin, Constructor, Manager, ManagerInfo, PolicyData, PolicyError, Status};
use events::{
    ApproveClaimEvent,
    ExpirePolicyEvent,
    RegisterPolicyEvent,
    RejectClaimEvent,
    RequestClaimEvent,
};
use errors::InsuranceManagerError;
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
            policy_type: data.policy_type,
            status: data.status,
            timestamp: data.timestamp,
        });
    }

    #[storage(read, write)]
    fn request_claim(policy_id: AssetId) {
        let policy = storage.policies.get(policy_id).try_read();

        require(policy.is_some(), InsuranceManagerError::PolicyNotFound);

        let current_timestamp = timestamp();
        let seconds_in_year: u64 = 365 * 24 * 60 * 60;

        let mut policy = policy.unwrap();

        if current_timestamp - policy.timestamp > seconds_in_year {
            let old_status = policy.status;
            policy.status = Status::Expired;

            storage.policies.insert(policy_id, policy);

            log(ExpirePolicyEvent {
                policy_id: policy_id,
                timestamp: current_timestamp,
                old_status: old_status,
                new_status: Status::Expired,
            });

            return;
        }

        require(
            match policy
                .status {
                Status::Active => true,
                _ => false,
            },
            InsuranceManagerError::InvalidPolicyStatus,
        );

        let old_status = policy.status;
        policy.status = Status::Claimed;

        storage.policies.insert(policy_id, policy);

        log(RequestClaimEvent {
            policy_id: policy_id,
            timestamp: current_timestamp,
            old_status: old_status,
            new_status: Status::Claimed,
        });
    }

    #[storage(read, write)]
    fn approve_claim(policy_id: AssetId) {
        only_owner();

        let policy = storage.policies.get(policy_id).try_read();
        require(policy.is_some(), InsuranceManagerError::PolicyNotFound);

        let mut policy = policy.unwrap();

        require(
            match policy
                .status {
                Status::Claimed => true,
                _ => false,
            },
            InsuranceManagerError::InvalidPolicyStatus,
        );

        let old_status = policy.status;
        policy.status = Status::Approved;

        storage.policies.insert(policy_id, policy);

        log(ApproveClaimEvent {
            policy_id: policy_id,
            timestamp: timestamp(),
            old_status: old_status,
            new_status: Status::Approved,
        });
    }

    #[storage(read, write)]
    fn reject_claim(policy_id: AssetId) {
        only_owner();

        let policy = storage.policies.get(policy_id).try_read();
        require(policy.is_some(), InsuranceManagerError::PolicyNotFound);

        let mut policy = policy.unwrap();

        require(
            match policy
                .status {
                Status::Claimed => true,
                _ => false,
            },
            InsuranceManagerError::InvalidPolicyStatus,
        );

        let old_status = policy.status;
        policy.status = Status::Rejected;

        storage.policies.insert(policy_id, policy);

        log(RejectClaimEvent {
            policy_id: policy_id,
            timestamp: timestamp(),
            old_status: old_status,
            new_status: Status::Rejected,
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

impl SRC5 for Contract {
    #[storage(read)]
    fn owner() -> State {
        _owner()
    }
}
