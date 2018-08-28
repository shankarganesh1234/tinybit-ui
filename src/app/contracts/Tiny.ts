/* GENERATED BY TYPECHAIN VER. 0.2.7 */
/* tslint:disable */

import { BigNumber } from "bignumber.js";
import * as TC from "./typechain-runtime";

export class Tiny extends TC.TypeChainContract {
  public readonly rawWeb3Contract: any;

  public constructor(web3: any, address: string | BigNumber) {
    const abi = [
      {
        constant: true,
        inputs: [{ name: "", type: "address" }],
        name: "keyValues",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: true,
        inputs: [],
        name: "key",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        constant: false,
        inputs: [{ name: "val", type: "string" }],
        name: "addKv",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
      },
      {
        constant: true,
        inputs: [{ name: "lookupKey", type: "address" }],
        name: "getKv",
        outputs: [{ name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      }
    ];
    super(web3, address, abi);
  }

  static async createAndValidate(
    web3: any,
    address: string | BigNumber
  ): Promise<Tiny> {
    const contract = new Tiny(web3, address);
    const code = await TC.promisify(web3.eth.getCode, [address]);

    // in case of missing smartcontract, code can be equal to "0x0" or "0x" depending on exact web3 implementation
    // to cover all these cases we just check against the source code length — there won't be any meaningful EVM program in less then 3 chars
    if (code.length < 4) {
      throw new Error(`Contract at ${address} doesn't exist!`);
    }
    return contract;
  }

  public get key(): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.key, []);
  }

  public keyValues(arg0: BigNumber | string): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.keyValues, [arg0.toString()]);
  }

  public getKv(lookupKey: BigNumber | string): Promise<string> {
    return TC.promisify(this.rawWeb3Contract.getKv, [lookupKey.toString()]);
  }

  public addKvTx(val: string): TC.DeferredTransactionWrapper<TC.ITxParams> {
    return new TC.DeferredTransactionWrapper<TC.ITxParams>(this, "addKv", [
      val.toString()
    ]);
  }
}