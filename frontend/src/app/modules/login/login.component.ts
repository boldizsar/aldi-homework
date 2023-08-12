import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnDestroy } from '@angular/core';
import { ROUTE_NAMES } from 'src/app/routing/app-routing.module';
import { Subscription, switchMap } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
    public username?: string;
    public isLoading = false;
    private subscription?: Subscription;

    constructor(private userService: UserService, private router: Router) {}

    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    public login(): void {
        if (this.username) {
            this.isLoading = true;

            this.subscription = this.userService
                .login(this.username)
                .pipe(switchMap(() => this.userService.isLoggedin))
                .subscribe((isLoggedIn) => {
                    this.isLoading = false;
                    if (isLoggedIn) {
                        this.router.navigate([ROUTE_NAMES.chat]);
                    }
                });
        }
    }
}
