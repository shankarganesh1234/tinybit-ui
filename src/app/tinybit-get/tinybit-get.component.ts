import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../services/core.service";
import {Detail} from "../models/detail";
import {Title} from "@angular/platform-browser";
import {WebService} from "../services/web.service";
import {IPFSService} from "../services/ipfs.service";
import {TextDecoder} from "text-encoding";

@Component({
    selector: 'tinybit-create',
    templateUrl: `./tinybit-get.component.html`
})


export class TinybitGetComponent implements OnInit {

    key: string;
    detail: Detail = new Detail();
    error: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private coreService: CoreService, private webService: WebService, private titleService: Title, private ipfsService: IPFSService) {

    }

    ngOnInit(): void {
        this.route.params.subscribe(val => {
            //this.webService.init();
            this.ipfsService.bootstrapIPFS();

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
            else {
                let hash: string = result;
                this.ipfsService.ipfs.files.get(hash, (err, result) => {
                    if(err) {
                        console.log(err);
                        this.error = true;
                    } else {
                        this.coreService.incrementCounter();
                        this.detail = JSON.parse(new TextDecoder("utf-8").decode(result[0].content));
                    }
                });
            }
        });
    }

    /**
     *
     * @param id
     */
    copyToClipboard(id): void {

        let el = document.getElementById(id) as HTMLInputElement;
        el.select();
        document.execCommand('copy');
    }
}


