module wool_street::core {
    use iota::balance::{Self, Balance};
    use iota::iota::IOTA;
    
    // FIX 1: Struct WAJIB Public di Move 2024
    public struct Goat has key, store {
        id: UID,
        name: vector<u8>,       
        visual_url: vector<u8>, 
        total_value: u64,       
    }

    public struct Accessory has key, store {
        id: UID,
        item_type: vector<u8>,  
        visual_url: vector<u8>, 
        savings: Balance<IOTA>, 
    }

    public entry fun mint_goat(name: vector<u8>, ctx: &mut TxContext) {
        let goat = Goat {
            id: object::new(ctx),
            name: name,
            visual_url: b"https://api.woolstreet.xyz/goat_base.png", 
            total_value: 0, 
        };
        transfer::public_transfer(goat, ctx.sender());
    }

    // Helper buat akses ID (karena field id private)
    public(package) fun goat_uid_mut(goat: &mut Goat): &mut UID {
        &mut goat.id
    }

    // FIX 2 & 3: Ganti 'type' jadi 'item_kind' & Tambah param 'url'
    public(package) fun create_accessory(
        money: Balance<IOTA>, 
        item_kind: vector<u8>, // <--- Ganti nama variabel
        url: vector<u8>,       // <--- Tambah parameter ini biar match
        ctx: &mut TxContext
    ): Accessory {
        Accessory {
            id: object::new(ctx),
            item_type: item_kind, // <--- Assign ke field
            visual_url: url,
            savings: money
        }
    }

    public fun get_item_value(item: &Accessory): u64 {
        balance::value(&item.savings)
    }
    
    public fun get_item_type(item: &Accessory): vector<u8> {
        item.item_type
    }

    public(package) fun update_goat_value(goat: &mut Goat, amount: u64, is_add: bool) {
        if (is_add) { 
            goat.total_value = goat.total_value + amount 
        } else { 
            goat.total_value = goat.total_value - amount 
        };
    }
}
