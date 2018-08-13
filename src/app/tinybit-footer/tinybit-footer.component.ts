import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

declare const $:any;
@Component({
    selector: 'tinybit-footer',
    templateUrl: `./tinybit-footer.component.html`
})


export class TinybitFooterComponent implements OnInit{

    constructor(private route: ActivatedRoute, private router: Router){
        route.params.subscribe(val => {

        });
    }

    ngOnInit(): void {
        //this.invokeCryptoService();
    }

}

