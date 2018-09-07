import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Counter} from "../models/counter";


@Component({
    selector: 'tinybit-about',
    templateUrl: `./tinybit-about.component.html`
})


export class TinybitAboutComponent implements OnInit{

    myStyle: object = {};
    myParams: object = {};
    width: number = 100;
    height: number = 100;

    count: Counter = new Counter();constructor(private route: ActivatedRoute, private router: Router){
        route.params.subscribe(val => {

        });
    }

    ngOnInit(): void {
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
            }}
    }
}


