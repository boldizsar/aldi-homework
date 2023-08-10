import { Directive } from '@angular/core';
import { UnsubscribeDirective } from './unsubscribe.directive';
import { IUser } from '../contracts/contracts';
import { UserService } from '../services/user.service';
import { takeUntil } from 'rxjs';

@Directive()
export class UserDirective extends UnsubscribeDirective {
    public user?: IUser;

    constructor(protected userService: UserService) {
        super();
        this.subscribeToUser();
    }

    protected subscribeToUser() {
        this.userService.userObservable
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((user) => {
                this.user = user;
            });
    }
}
