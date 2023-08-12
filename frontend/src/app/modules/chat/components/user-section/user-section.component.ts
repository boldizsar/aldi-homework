import { IUser, UserService } from 'src/app/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from 'src/app/routing/app-routing.module';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-user-section',
    templateUrl: './user-section.component.html',
    styleUrls: ['./user-section.component.scss'],
})
export class UserSectionComponent implements OnInit, OnDestroy {
    public user?: IUser;
    unsubscribe: Subject<void> = new Subject<void>();

    constructor(private userService: UserService, private router: Router) {}

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public ngOnInit(): void {
        this.subscribeToUser();
    }

    public logout(): void {
        this.userService.logout();
        this.router.navigate([ROUTE_NAMES.login]);
    }

    private subscribeToUser() {
        this.userService.userObservable
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((user) => {
                this.user = user;
            });
    }
}
