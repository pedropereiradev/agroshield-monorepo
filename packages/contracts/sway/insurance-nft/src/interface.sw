library;

abi Constructor {
    #[storage(read, write)]
    fn constructor(owner: Identity, admin: Identity);
}

abi Admin {
    #[storage(read, write)]
    fn add_admin(admin: Identity);

    #[storage(read, write)]
    fn revoke_admin(admin: Identity);

    #[storage(read, write)]
    fn transfer_ownership(new_owner: Identity);
}
