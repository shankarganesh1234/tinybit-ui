import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../services/core.service";
import {Counter} from "../models/counter";

declare const $:any;
@Component({
    selector: 'tinybit-home',
    templateUrl: `./tinybit-home.component.html`
})


export class TinybitHomeComponent implements OnInit{

    counter: number = 0;
    constructor(private route: ActivatedRoute, private router: Router, private coreService: CoreService){
        route.params.subscribe(val => {
            this.getCount();
        });
    }

    ngOnInit(): void {
        this.getCount();
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

