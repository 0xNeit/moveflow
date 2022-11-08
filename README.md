# Move stream

### Supported dependencies
- aptos-cli: `Aptos CLI Release v1.0.0`
- AptosFramework: `main @ 01108a2345b87d539d54a67b32db55193f9ace40`
- AptosStdlib: `main @ 01108a2345b87d539d54a67b32db55193f9ace40`

### Roles and Calls
- `owner`: `publish`, `initialize`, `set_admin`, `set_fee_point`
- `admin`: `register_coin`
- `user`: `create`, `withdraw`, `close`

# movepay tree

├── build
├── LICENSE
├── Move.toml
├── README.md
└── sources
```

### Compile & Test & Publish
run `aptos init` in `movepay` to config aptos network environment

example result
```bash
 cd movepay
 cat .aptos/config.yaml 
---
profiles:
  default:
    private_key: <your privkey>
    public_key: <your pubkey>
    account: <your address>
    rest_url: "https://fullnode.devnet.aptoslabs.com/v1"
    faucet_url: "https://faucet.devnet.aptoslabs.com/"

```

```bash
aptos move compile --named-addresses Stream=<your address>

aptos move test

aptos move publish --named-addresses Stream=<your address>
```

### test cmds
test coins
```move
module mycoin::Coins {
    /// Coin define
    ////////////////////////
    struct TestCoin {}

    struct XBTC {}

    struct XETH {}

    struct XDOT {}
    ////////////////////////
}
```

```bash
# publish mycoin
aptos move publish \
    --named-addresses mycoin=0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368

# issue coins
aptos move run \
    --function-id 0x1::managed_coin::initialize \
    --args string:"Test" string:"Test" u8:8 bool:true \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::TestCoin \
    --assume-yes

aptos move run \
    --function-id 0x1::managed_coin::initialize \
    --args string:"XBTC" string:"XBTC" u8:8 bool:true \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::XBTC \
    --assume-yes

aptos move run \
    --function-id 0x1::managed_coin::initialize \
    --args string:"XETH" string:"XETH" u8:8 bool:true \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::XETH \
    --assume-yes

aptos move run \
    --function-id 0x1::managed_coin::initialize \
    --args string:"XDOT" string:"XDOT" u8:8 bool:true \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::XDOT \
    --assume-yes

# register account
aptos move run \
    --function-id 0x1::managed_coin::register \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::TestCoin \
    --assume-yes

aptos move run \
    --function-id 0x1::managed_coin::register \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::XBTC \
    --assume-yes

aptos move run \
    --function-id 0x1::managed_coin::register \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::XETH \
    --assume-yes

aptos move run \
    --function-id 0x1::managed_coin::register \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::XDOT \
    --assume-yes

# mint coins
aptos move run \
    --function-id 0x1::managed_coin::mint \
    --args address:0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368 u64:10000000000 \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::TestCoin \
    --assume-yes

aptos move run \
    --function-id 0x1::managed_coin::mint \
    --args address:0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368 u64:10000000000 \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::XBTC \
    --assume-yes

aptos move run \
    --function-id 0x1::managed_coin::mint \
    --args address:0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368 u64:10000000000 \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::XETH \
    --assume-yes

aptos move run \
    --function-id 0x1::managed_coin::mint \
    --args address:0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368 u64:10000000000 \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::XDOT \
    --assume-yes

==================================================================================================

# publish movepay
aptos move publish --named-addresses Stream=0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368

# owner movepay::initialize
aptos move run \
    --function-id 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::movepay::initialize \
    --args address:0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368 \
           address:0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368

# admin movepay::register_coin
aptos move run \
    --function-id 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::movepay::register_coin \
    --type-args 0x1::aptos_coin::AptosCoin \
    --assume-yes

aptos move run \
    --function-id 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::movepay::register_coin \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::XBTC \
    --assume-yes

aptos move run \
    --function-id 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::movepay::register_coin \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::XETH \
    --assume-yes

aptos move run \
    --function-id 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::movepay::register_coin \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::XDOT \
    --assume-yes

aptos move run \
    --function-id 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::movepay::register_coin \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::TestCoin \
    --assume-yes

# admin movepay::create
aptos move run \
    --function-id 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::movepay::create \
    --args u64:0 u64:1000 u64:10000 \
    --type-args 0x1::aptos_coin::AptosCoin \
    --assume-yes

aptos move run \
    --function-id 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::movepay::create \
    --args u64:1 u64:1000 u64:10000 \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::XBTC \
    --assume-yes

aptos move run \
    --function-id 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::movepay::create \
    --args u64:2 u64:1000 u64:10000 \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::XETH \
    --assume-yes

aptos move run \
    --function-id 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::movepay::create \
    --args u64:3 u64:1000 u64:10000 \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::XDOT \
    --assume-yes

aptos move run \
    --function-id 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::movepay::create \
    --args u64:4 u64:1000 u64:10000 \
    --type-args 0x7f2868a381a1aa961cb4ce4dc3e0f9146b787b342fd0a45c1f1d9240df0e2368::Coins::TestCoin \
    --assume-yes

```
