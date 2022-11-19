/* eslint-disable no-console */
import {AptosClient, AptosAccount, Types, HexString} from "aptos";
const fs = require("fs");

const NODE_URL = process.env.APTOS_NODE_URL || "https://fullnode.testnet.aptoslabs.com/v1";
const STREAMPAY_ADDR = "0x0e1cad35db73ecab64d22230b2e9a59ba0cee1104bbf71fcd566f047ec40da4b";
const RECEIVER_ADDR = "0x0e1cad35db73ecab64d22230b2e9a59ba0cee1104bbf71fcd566f047ec40da4b";

(async () => {
  const client = new AptosClient(NODE_URL);

  const pkStr = fs.readFileSync("../testkey").toString()
                                                    .replace("0x", "")
                                                    .replace("0X", "")
                                                    .trim();
  const pkHex = Uint8Array.from(Buffer.from(pkStr, 'hex'));
  const account1 = new AptosAccount(pkHex);

  console.log(`=============== Retrieving balance of account: ${account1.address()}`);
  let resources = await client.getAccountResources(STREAMPAY_ADDR);
  // console.log("resources", resources);
  let accountResource = resources.find((r) => r.type === "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>");
  let balance = (accountResource?.data as { coin: { value: string } }).coin.value;
  console.log(`=============== account1 coins: ${balance}`);

  console.log("=============== Start creating payment stream")
  let payload: Types.TransactionPayload = {
    type: "entry_function_payload",
    function: `${STREAMPAY_ADDR}::streampay::create`,
    type_arguments: ["0x1::aptos_coin::AptosCoin"],
    arguments: [RECEIVER_ADDR, "100000", "1000", "10000", "0"],
  };
  let txnRequest = await client.generateTransaction(account1.address(), payload);
  let signedTxn = await client.signTransaction(account1, txnRequest);
  let transactionRes = await client.submitTransaction(signedTxn);
  await client.waitForTransaction(transactionRes.hash);
  console.log("=============== Payment stream created!")

  // let modules = await client.getAccountModules(STREAMPAY_ADDR);
  // console.log("modules", modules);

  console.log("=============== Start extending payment stream")
  payload = {
    type: "entry_function_payload",
    function: `${STREAMPAY_ADDR}::streampay::extend`,
    type_arguments: ["0x1::aptos_coin::AptosCoin"],
    arguments: ["20000", "0", "0"],
  };
  txnRequest = await client.generateTransaction(account1.address(), payload);
  signedTxn = await client.signTransaction(account1, txnRequest);
  transactionRes = await client.submitTransaction(signedTxn);
  await client.waitForTransaction(transactionRes.hash);
  console.log("=============== Payment stream extended!")

  console.log("=============== Start withdrawing payment stream");
  payload = {
    type: "entry_function_payload",
    function: `${STREAMPAY_ADDR}::streampay::withdraw`,
    type_arguments: ["0x1::aptos_coin::AptosCoin"],
    arguments: ["0", "0"],
  };
  txnRequest = await client.generateTransaction(account1.address(), payload);
  signedTxn = await client.signTransaction(account1, txnRequest);
  transactionRes = await client.submitTransaction(signedTxn);
  await client.waitForTransaction(transactionRes.hash);
  console.log("=============== Start payment stream withdrawed!")

  console.log("=============== Start closing payment stream");
  payload = {
    type: "entry_function_payload",
    function: `${STREAMPAY_ADDR}::streampay::close`,
    type_arguments: ["0x1::aptos_coin::AptosCoin"],
    arguments: ["0", "0"],
  };
  txnRequest = await client.generateTransaction(account1.address(), payload);
  signedTxn = await client.signTransaction(account1, txnRequest);
  transactionRes = await client.submitTransaction(signedTxn);
  await client.waitForTransaction(transactionRes.hash);
  console.log("=============== Start payment stream closed!")

})();

