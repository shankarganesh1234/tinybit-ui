import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../services/core.service";
import {Counter} from "../models/counter";
import {Detail} from "../models/detail";
import {CoinDetail} from "../models/coin-detail";
import {CCDetail} from "../models/cc-detail";
import {Title} from "@angular/platform-browser";
import {WebService} from "../services/web.service";
import {constants} from "../constants";

declare const $:any;
@Component({
    selector: 'tinybit-create',
    templateUrl: `./tinybit-create.component.html`
})


export class TinybitCreateComponent implements OnInit{

    detail: Detail = new Detail();
    errorMsg: string = '';
    successMsg: string = constants._checkMetamask;
    coinDetails: CoinDetail[] = [];
    ccDetails: CCDetail[];

    constructor(private route: ActivatedRoute, private router: Router, private coreService: CoreService, private titleService: Title, private webService: WebService){
        route.params.subscribe(val => {
            //this.init();
        });
    }

    ngOnInit(): void {
        // reset errors
        this.errorMsg = '';
        this.init();
        this.titleService.setTitle('tinybit.link - Tiny urls for all your crypto currency wallet addresses');
    }

    /**
     * init and get list of currencies
     */
    init(): void {

        this.coreService.getCurrencies().subscribe(
            result => this.extractCurrencies(result),
        );
    }

    /**
     * Add a row and append a coin detail to list
     */
    addRow(): void {

        // reset errors
        this.errorMsg = '';

        if(this.coinDetails.length >= constants._maxLength) {
            this.errorMsg = constants._maxLengthError;
            return;
        }

        let coinDetail1 = new CoinDetail();
        coinDetail1.name = constants.BTC;
        coinDetail1.symbol = constants.BTC;
        coinDetail1.alias = '';
        this.coinDetails.push(coinDetail1);
        this.coinChanged(coinDetail1.symbol,this.coinDetails.length - 1);
    }

    /**
     * delete row and reset errors
     * @param {number} index
     */
    deleteRow(index: number): void {
        // reset errors
        this.errorMsg = '';

        this.coinDetails.splice(index, 1);
    }

    /**
     * change selection
     * @param {string} symbol
     * @param {number} index
     */
    coinChanged(symbol: string, index: number): void {
        // reset errors
        this.errorMsg = '';

        if(symbol == null) {
            this.errorMsg = constants._unableToSaveError;
            return;
        }

        let temp: CCDetail = this.ccDetails.find(function (e) {
            return e.symbol === symbol;
        });

        this.coinDetails[index].name = temp.name;
        this.coinDetails[index].imageUrl = temp.imageUrl;
    }

    /**
     * validate and create url
     */
    createUrl(): void {
        if(this.validate()) {
            this.detail.coinDetails = this.coinDetails;
            let val = this.webService.createEntry(this.detail);

            val.then(result => {
                if(result === null || result === undefined)
                    this.errorMsg = constants._unableToCompleteTransaction;
            })
        }
    }

    /**
     *
     * @param {Counter} counter
     */
    extractCurrencies(ccDetails: CCDetail[], ): void {
        this.ccDetails = ccDetails;
        // default row
        let coinDetail1 = new CoinDetail();
        coinDetail1.name = constants.BTC;
        coinDetail1.symbol = constants.BTC;
        coinDetail1.alias = '';
        coinDetail1.walletAddress = '';
        this.coinDetails.push(coinDetail1);

        this.coinChanged('BTC',this.coinDetails.length - 1);
        }

    /**
     * validate before submit
     */
    validate(): boolean {

        // reset errors
        this.errorMsg = '';

        if(this.detail == null || this.detail.name === '') {
            this.errorMsg = constants._missingNameError;
            return false;
        }

        if(this.coinDetails == null || this.coinDetails.length == 0) {
            this.errorMsg = constants._missingAddressError;
            return false;
        }

        if(this.coinDetails.length > constants._maxLength) {
            this.errorMsg = constants._maxLengthExceededError;
            return false;
        }

        this.coinDetails.forEach((e) => {

            if(e == null || e.name == null || e.name === '' || e.symbol == null || e.symbol === '' || e.walletAddress == null
            || e.walletAddress === '') {
                this.errorMsg = constants._missingDetailsError;
                return false;
            }

            if(e.walletAddress == null || e.walletAddress === '' || e.walletAddress.indexOf(' ') > 0) {
                this.errorMsg = constants._incorrectWalletError;
                return false;
            }
        });

        if(this.errorMsg === '')
            return true;
        else
            return false;
    }
}

