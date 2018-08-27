import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../services/core.service";
import {Counter} from "../models/counter";
import {WebService} from "../services/web.service";
import Hashids from 'hashids';


declare const $:any;
@Component({
    selector: 'tinybit-home',
    templateUrl: `./tinybit-home.component.html`
})


export class TinybitHomeComponent implements OnInit{

    counter: number = 0;
    constructor(private route: ActivatedRoute, private router: Router, private coreService: CoreService, private webService: WebService){
        route.params.subscribe(val => {
            this.getCount();
        });
    }

    ngOnInit(): void {
        //this.getCount();
    }

    /**
     *
     */
    getCount(): void {

        let hashId = new Hashids("this is my salt");
        let id = hashId.encode(1, 2, 3);
        console.log(id);
        let numbers = hashId.decode(id);
        console.log(numbers);

        //this.webService.getUserBalance().then(balance => console.log(balance));

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

