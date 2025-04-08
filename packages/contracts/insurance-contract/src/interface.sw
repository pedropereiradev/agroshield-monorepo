library;

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
