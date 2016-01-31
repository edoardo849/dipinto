import {View, Component} from 'angular2/core';
import {Location, RouteConfig, RouterLink, Router, RouterOutlet} from 'angular2/router';

import {Play} from '../play/play';

@Component({
    selector: 'dipinto-app'
})
@View({
    template: `
    <h1 class="ui center aligned huge header logo red">Dipinto</h1>
    <router-outlet></router-outlet>

    <div class="ui two column centered grid container" id="footer">

        <div class="column">
            <div class="ui divider"></div>
            <p>Dipinto is a demo project built with Angular2 and NodeJS</p>
            <p>
            <a class="ui label blue" href="https://twitter.com/edoardo849">
                <i class="twitter icon"></i> Follow @edoardo849
            </a>
            <a class="ui label grey" href="https://twitter.com/edoardo849">
                <i class="github icon"></i> edoardo849
            </a>
            </p>

        </div>
      </div>
    `,
    directives: [RouterOutlet]

})
@RouteConfig([
    { path: '/', redirectTo: ['/Play'] },
    { path: '/play', component: Play, as: 'Play' },
])

export class App {
    constructor(public router: Router) {
    }
}
