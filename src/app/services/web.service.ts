import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";
// Import RxJs required methods
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import Web3 from 'web3';
import {Tiny} from "../contracts/Tiny"
import {constants} from "../constants"
import {Observable} from "rxjs";
import {Detail} from "../models/detail";


declare let window: any;

@Injectable()
export class WebService {

    private _account: string = null;
    private _networkVersion: string = null;
    private _apiVersion: string = null;
    private _web3: any;
    private _tokenContractAddress: string = "0xa209e3ba21efa5f2f535b4c2705d4b1bcc67c046";
    private _tinyContract: Tiny = null;

    constructor() {
        this.init()
    }

    /**
     * Set the network version
     */
    private init(): void {
        if (typeof window.web3 !== 'undefined') {
            // Use Mist/MetaMask's provider
            // @ts-ignore
            this._web3 = new Web3(window.web3.currentProvider);
            this.setNetworkVersion();
            this.setApiVersion();
            this.loadAccount();
            this.loadContract();
            //this._web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

        } else {
            console.warn(
                'Please use a dapp browser like mist or MetaMask plugin for chrome'
            );
        }
    }

    /**
     *
     * @returns {Observable<Detail>}
     */
    createEntry(detail: Detail): string {
        console.log(JSON.stringify(detail));
        let val = this._tinyContract.addKvTx(JSON.stringify(detail)).send({from: this._account, gas: constants._standardGas});
        console.log(val);
        return "success";
    }

    async getEntry(): Promise<Detail> {

        let contract: Tiny = await this.loadContract();
        let val = await contract.getKv(this._account);
        console.log(val);
        let valStr = this._web3.toAscii(val);
        console.log(valStr);
        let detail : Detail = JSON.parse(valStr);
        return detail;
    }


    /**
     * Load contract into tinyContract for further interaction
     */
    private async loadContract() {
        this._tinyContract = await Tiny.createAndValidate(this._web3, this._tokenContractAddress);
        return this._tinyContract;
    }

    /**
     * Set the primary account number.
     * Check the web3 version, since APIs are different based on the version
     */
    private loadAccount(): void {

        if (this._apiVersion === constants._apiVersion) {
            this.setPrimaryAccount(this._web3.eth.accounts[0]);
        }
    }

    /**
     * Set primary account
     * @param account
     */
    private setPrimaryAccount(account: string): void {
        this._account = account;
    }

    /**
     * Set the network version
     */
    private setNetworkVersion(): void {
        this._networkVersion = this._web3.version.network;
    }

    /**
     * Set the api version
     */
    private setApiVersion(): void {
        this._apiVersion = this._web3.version.api;
    }

}
