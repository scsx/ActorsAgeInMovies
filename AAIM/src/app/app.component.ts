import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { allAnimations } from './shared/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        allAnimations
    ]
})
export class AppComponent implements OnInit {


    constructor() {}

    ngOnInit() {}

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animationName'];
    }
}
