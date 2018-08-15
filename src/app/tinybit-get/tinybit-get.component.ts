import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../services/core.service";
import {Detail} from "../models/detail";

declare const $: any;

@Component({
    selector: 'tinybit-create',
    templateUrl: `./tinybit-get.component.html`
})

export class TinybitGetComponent implements OnInit {

    key: String;
    detail: Detail = new Detail();

    constructor(private route: ActivatedRoute, private router: Router, private coreService: CoreService) {

    }

    ngOnInit(): void {
        this.route.params.subscribe(val => {
            this.key = val['key'];
            this.getUrl();
        });
    }

    /**
     * validate and create url
     */
    getUrl(): void {

        this.coreService.getUrl(this.key).subscribe(
            result => this.extractCreateUrl(result),
        );
    }

    extractCreateUrl(detail: Detail): void {
        this.detail = detail;
    }

    testThis(): void {
        let el = document.getElementById('sharableLink') as HTMLInputElement;
        el.select();
        document.execCommand('copy');
    }
}


