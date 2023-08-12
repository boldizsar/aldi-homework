import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of, tap } from 'rxjs';

export interface IUser {
    name: string;
}

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private userSubject = new BehaviorSubject<IUser | undefined>(undefined);
    public userObservable = this.userSubject.asObservable();

    public get isLoggedin(): Observable<boolean> {
        return this.userObservable.pipe(map((user) => user != null));
    }

    public login(username: string): Observable<boolean> {
        const user = { name: username };
        return of(true).pipe(
            delay(1000),
            tap(() => this.userSubject.next(user))
        );
    }

    public logout(): void {
        this.userSubject.next(undefined);
    }
}
