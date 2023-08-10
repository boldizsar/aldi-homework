import { UserDirective } from './../../../../directives/user.directive';
import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent extends UserDirective {
    constructor(protected override userService: UserService) {
        super(userService);
    }
}
