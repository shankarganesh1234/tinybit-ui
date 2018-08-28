import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {CoreService} from "./services/core.service";
import {Counter} from "./models/counter";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    counter: number = 0;

    title = 'app works!';
    search: string = '';

    constructor(private router: Router) {

    }

    /**
     *
     */
    navigate(searchStr: string): void {
        this.router.navigate([searchStr]);
    }
}
