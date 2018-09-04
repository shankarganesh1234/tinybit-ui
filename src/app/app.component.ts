import {Component} from '@angular/core';
import {Router} from "@angular/router";

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
        this.search = '';
    }

    /**
     *
     */
    navigate(searchStr: string): void {
        this.router.navigate([searchStr]);
    }
}
