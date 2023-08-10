import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { UserDirective } from 'src/app/directives/user.directive';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from 'src/app/routing/app-routing.module';

@Component({
    selector: 'app-user-section',
    templateUrl: './user-section.component.html',
    styleUrls: ['./user-section.component.scss'],
})
export class UserSectionComponent extends UserDirective {
    constructor(
        protected override userService: UserService,
        private router: Router
    ) {
        super(userService);
    }

    public logout(): void {
        this.userService.logout();
        this.router.navigate([ROUTE_NAMES.login]);
    }
}
