import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { ROUTE_NAMES } from './app-routing.module';

export const authGuard: CanActivateFn = () => {
    const userService: UserService = inject(UserService);
    const router = inject(Router);

    return userService.isLoggedin.pipe(
        map((isLoggedIn) => {
            return isLoggedIn ? isLoggedIn : router.parseUrl(ROUTE_NAMES.login);
        })
    );
};
