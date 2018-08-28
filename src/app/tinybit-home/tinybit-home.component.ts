import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../services/core.service";
import {Counter} from "../models/counter";
import {WebService} from "../services/web.service";


@Component({
    selector: 'tinybit-home',
    templateUrl: `./tinybit-home.component.html`
})


export class TinybitHomeComponent implements OnInit{

    counter: number = 0;
    isWeb3Supported: boolean  = false;
    constructor(private route: ActivatedRoute, private router: Router, private coreService: CoreService, private webService: WebService){
        route.params.subscribe(val => {
            this.getCount();
        });
    }

    ngOnInit(): void {
        this.isWeb3Supported = this.webService.isWeb3Supported();
        //this.getCount();
    }

    /**
     *
     */
    getCount(): void {

        this.coreService.getCount().subscribe(
            result => this.extractCounter(result),
        );
    }

    /**
     *
     * @param {Counter} counter
     */
    extractCounter(counter: Counter): void {
        this.counter = counter.currentCount;
    }
}

