import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Counter} from "../models/counter";


@Component({
    selector: 'tinybit-about',
    templateUrl: `./tinybit-about.component.html`
})


export class TinybitAboutComponent implements OnInit{

    count: Counter = new Counter();constructor(private route: ActivatedRoute, private router: Router){
        route.params.subscribe(val => {

        });
    }

    ngOnInit(): void {

    }
}

