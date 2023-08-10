import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { ROUTE_NAMES } from 'src/app/routing/app-routing.module';
import { switchMap, takeUntil } from 'rxjs';
import { UnsubscribeDirective } from 'src/app/directives/unsubscribe.directive';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends UnsubscribeDirective {
    public username?: string;
    public isLoading = false;

    constructor(private userService: UserService, private router: Router) {
        super();
    }

    public login(): void {
        if (this.username) {
            this.isLoading = true;

            this.userService
                .login(this.username)
                .pipe(
                    switchMap(() => this.userService.isLoggedin),
                    takeUntil(this.unsubscribe)
                )
                .subscribe((isLoggedIn) => {
                    this.isLoading = false;
                    if (isLoggedIn) {
                        this.router.navigate([ROUTE_NAMES.chat]);
                    }
                });
        }
    }
}
