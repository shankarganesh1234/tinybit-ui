import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../services/core.service";
import {Counter} from "../models/counter";
import {Detail} from "../models/detail";
import {CoinDetail} from "../models/coin-detail";
import {CCDetail} from "../models/cc-detail";
import {Title} from "@angular/platform-browser";

declare const $:any;
@Component({
    selector: 'tinybit-create',
    templateUrl: `./tinybit-create.component.html`
})


export class TinybitCreateComponent implements OnInit{

    detail: Detail = new Detail();
    errorMsg: string = '';
    coinDetails: CoinDetail[] = [];
    ccDetails: CCDetail[];
    maxNumberOfAddresses: number = 5;

    constructor(private route: ActivatedRoute, private router: Router, private coreService: CoreService, private titleService: Title){
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

        // default row
        let coinDetail1 = new CoinDetail();
        coinDetail1.name = 'BTC';
        coinDetail1.symbol = 'BTC';
        coinDetail1.alias = '';
        coinDetail1.walletAddress = '';
        this.coinDetails.push(coinDetail1);
    }

    /**
     * Add a row and append a coin detail to list
     */
    addRow(): void {

        // reset errors
        this.errorMsg = '';

        if(this.coinDetails.length >= this.maxNumberOfAddresses) {
            this.errorMsg = 'Sorry. The maximum number of addresses that can be saved are 5';
            return;
        }

        let coinDetail1 = new CoinDetail();
        coinDetail1.name = 'BTC';
        coinDetail1.symbol = 'BTC';
        coinDetail1.alias = '';
        this.coinDetails.push(coinDetail1);
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
            this.errorMsg = 'Sorry. The selected coin cannot be saved';
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
            this.coreService.createUrl(this.detail).subscribe(
                result => this.extractCreateUrl(result),
            );
        }
    }

    /**
     *
     * @param {Counter} counter
     */
    extractCurrencies(ccDetails: CCDetail[], ): void {
        this.ccDetails = ccDetails;
    }

    extractCreateUrl(detail: Detail): void {

        let key = detail.key;
        this.router.navigate([key]);
    }

    /**
     * validate before submit
     */
    validate(): boolean {

        // reset errors
        this.errorMsg = '';

        if(this.detail == null || this.detail.name === '') {
            this.errorMsg = 'Please add a name';
            return false;
        }

        if(this.coinDetails == null || this.coinDetails.length == 0) {
            this.errorMsg = 'Please add at least one address';
            return false;
        }

        if(this.coinDetails.length > this.maxNumberOfAddresses) {
            this.errorMsg = 'This is more than I can chew';
            return false;
        }

        this.coinDetails.forEach((e) => {

            if(e == null || e.name == null || e.name === '' || e.symbol == null || e.symbol === '' || e.walletAddress == null
            || e.walletAddress === '') {
                this.errorMsg = 'Please complete all the details';
                return false;
            }

            if(e.walletAddress == null || e.walletAddress === '' || e.walletAddress.indexOf(' ') > 0) {
                this.errorMsg = 'Please correct the wallet address';
                return false;
            }
        });

        if(this.errorMsg === '')
            return true;
        else
            return false;
    }
}

