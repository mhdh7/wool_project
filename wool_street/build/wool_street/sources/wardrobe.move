module wool_street::wardrobe {
    use iota::dynamic_object_field as dof; 
    // Hapus import tx_context & transfer yang bikin warning
    
    use wool_street::core::{Goat, Accessory}; 

    public entry fun equip(
        goat: &mut Goat, 
        item: Accessory, 
        _ctx: &mut TxContext 
    ) {
        let val = wool_street::core::get_item_value(&item);
        wool_street::core::update_goat_value(goat, val, true);

        let type_name = wool_street::core::get_item_type(&item);
        
        // Pake helper karena field id private
        let goat_uid = wool_street::core::goat_uid_mut(goat);
        dof::add(goat_uid, type_name, item);
    }

    public entry fun unequip(
        goat: &mut Goat, 
        type_name: vector<u8>, 
        ctx: &mut TxContext
    ) {
        let goat_uid = wool_street::core::goat_uid_mut(goat);
        let item: Accessory = dof::remove(goat_uid, type_name);

        let val = wool_street::core::get_item_value(&item);
        wool_street::core::update_goat_value(goat, val, false);

        transfer::public_transfer(item, ctx.sender());
    }
}
