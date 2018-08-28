import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../services/core.service";
import {Detail} from "../models/detail";
import {Title} from "@angular/platform-browser";
import {WebService} from "../services/web.service";

@Component({
    selector: 'tinybit-create',
    templateUrl: `./tinybit-get.component.html`
})

export class TinybitGetComponent implements OnInit {

    key: string;
    detail: Detail = new Detail();
    error: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private coreService: CoreService, private webService: WebService, private titleService: Title) {

    }

    ngOnInit(): void {
        this.route.params.subscribe(val => {
            this.error = false;
            this.key = val['key'];
            this.getUrl(this.key);
        });
        this.titleService.setTitle('tinybit.link - Tiny urls for all your crypto currency wallet addresses');
    }

    /**
     * validate and create url
     */
    getUrl(key: string): void {

        this.webService.getEntry(key).then(result => {
            if(result === null || result === undefined)
                this.error = true;
            else
                this.detail = result;
        });
    }

    /**
     *
     * @param id
     */
    copyToCLipboard(id): void {

        let el = document.getElementById(id) as HTMLInputElement;
        el.select();
        document.execCommand('copy');
    }
}


