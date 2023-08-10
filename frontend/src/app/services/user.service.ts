import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of, tap } from 'rxjs';
import { IUser } from '../contracts/contracts';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private userSubject = new BehaviorSubject<IUser | null>(null);
    public userObservable = this.userSubject.asObservable();

    public get isLoggedin(): Observable<boolean> {
        return this.userObservable.pipe(map((user) => user != null));
    }

    constructor(private apiService: ApiService) {}

    // TODO: Retrieve user from backend
    public login(username: string): Observable<boolean> {
        return of(true).pipe(
            delay(1000),
            tap(() => this.userSubject.next({ name: username }))
        );
    }

    public logout(): void {
        this.userSubject.next(null);
    }
}
