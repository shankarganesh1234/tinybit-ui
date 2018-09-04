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
    private _tokenContractAddress: string = constants._contractAddress;
    private _tinyContract: Tiny = null;
    private _isWeb3Supported: boolean = false;

    constructor() {
        this.init()
    }

    /**
     * Set the network version
     */
    private init(): void {
        try {
            if (typeof window.web3 !== 'undefined') {
                // Use Mist/MetaMask's provider
                // @ts-ignore
                this._web3 = new Web3(window.web3.currentProvider);
                this.setNetworkVersion();
                this.setApiVersion();
                this.loadAccount();
                this.loadContract();
                //this._web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
                this._isWeb3Supported = true;

            } else {
                console.warn(
                    'Please use a dapp browser like mist or MetaMask plugin for chrome'
                );
                this._isWeb3Supported = false;
            }
        } catch (e) {

        }
    }

    /**
     *
     */
    public getCurrentAccount(): string {
        return this._account;
    }
    /**
     *
     */
    public isWeb3Supported(): boolean {
        return this._isWeb3Supported;
    }

    /**
     *
     * @returns {Observable<Detail>}
     */
    async createEntry(detail: string): Promise<string> {
        try {
            let val = await this._tinyContract.addKvTx(detail).send({from: this._account, gas: constants._standardGas, value: constants._fee});
            return constants.done;
        } catch (e) {
            return null;
        }
    }

    /**
     *
     * @param key
     */
    async getEntry(key: string): Promise<string> {

        try {
            let contract: Tiny = await this.loadContract();
            //let val = await contract.getKv(this._account);
            let val = await contract.getKv(key);

            if(val === null || val === undefined || val === '')
                return null;

            return val;
        } catch (e) {
            return null;
        }
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
