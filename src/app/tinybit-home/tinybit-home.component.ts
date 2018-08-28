import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../services/core.service";
import {WebService} from "../services/web.service";


@Component({
    selector: 'tinybit-home',
    templateUrl: `./tinybit-home.component.html`
})


export class TinybitHomeComponent implements OnInit{

    isWeb3Supported: boolean  = false;
    constructor(private route: ActivatedRoute, private router: Router, private coreService: CoreService, private webService: WebService){
        route.params.subscribe(val => {

        });
    }

    ngOnInit(): void {
        this.isWeb3Supported = this.webService.isWeb3Supported();
    }
}

