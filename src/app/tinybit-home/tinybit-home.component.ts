import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {CoreService} from "../services/core.service";
import {WebService} from "../services/web.service";
import {Counter} from "../models/counter";


@Component({
    selector: 'tinybit-home',
    templateUrl: `./tinybit-home.component.html`
})


export class TinybitHomeComponent implements OnInit{

    isWeb3Supported: boolean  = false;
    count: Counter = new Counter();

    myStyle: object = {};
    myParams: object = {};
    width: number = 100;
    height: number = 100;


    constructor(private route: ActivatedRoute, private router: Router, private coreService: CoreService, private webService: WebService){
        route.params.subscribe(val => {

        });
    }

    ngOnInit(): void {
        this.isWeb3Supported = this.webService.isWeb3Supported();
        this.coreService.getCounter().subscribe(result => {
            this.count = result;
        });

        this.myStyle = {
            'position': 'fixed',
            'width': '100%',
            'height': '100%',
            'z-index': -1,
            'top': 0,
            'left': 0,
            'right': 0,
            'bottom': 0
        };

        this.myParams = {
            particles: {
                number: {
                    value: 50,
                },
                color: {
                    value: '#fd5c63'
                },
                shape: {
                    type: 'triangle',
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#000000',
                    opacity: 0.4,
                    width: 1
                }
            }
    }}
}

