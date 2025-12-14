module wool_street::market {
    use iota::coin::{Self, Coin};
    use iota::iota::IOTA;
    // Hapus import transfer, object, tx_context (udah default)
    
    use wool_street::core; 

    const E_INSUFFICIENT_PAYMENT: u64 = 1;

    // FIX: Struct WAJIB Public
    public struct MarketConfig has key {
        id: UID,
        fee_bps: u64, 
        admin: address
    }

    fun init(ctx: &mut TxContext) {
        transfer::share_object(MarketConfig {
            id: object::new(ctx),
            fee_bps: 100, 
            admin: ctx.sender()
        });
    }

    public entry fun buy_accessory(
        config: &MarketConfig,
        payment: &mut Coin<IOTA>, 
        price_amount: u64,       
        item_type: vector<u8>,   
        item_url: vector<u8>,    
        ctx: &mut TxContext
    ) {
        let fee_amount = (price_amount * config.fee_bps) / 10000;
        let total_required = price_amount + fee_amount;

        assert!(payment.value() >= total_required, E_INSUFFICIENT_PAYMENT);

        let fee_coin = coin::split(payment, fee_amount, ctx);
        transfer::public_transfer(fee_coin, config.admin);

        let principal_coin = coin::split(payment, price_amount, ctx);
        let saving_balance = coin::into_balance(principal_coin);

        // Panggil fungsi core dengan argumen yang pas (sudah 4 argumen)
        let new_item = wool_street::core::create_accessory(
            saving_balance,
            item_type,
            item_url,
            ctx
        );
        transfer::public_transfer(new_item, ctx.sender());
    }
}
