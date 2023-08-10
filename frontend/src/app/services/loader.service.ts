import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

export const SHOW_LOADER_WHITE_LIST = [environment.endpoints.login];

export const SHOW_LOADER_BLACK_LIST = [];

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
    private loaderStateSubject = new BehaviorSubject<boolean>(false);
    public loaderState = this.loaderStateSubject.asObservable();

    private loadingRequests = 0;

    public showLoader(): void {
        this.loadingRequests++;
        this.loaderStateSubject.next(true);
    }

    public hideLoader(): void {
        if (this.loadingRequests > 0) {
            this.loadingRequests--;
        }

        if (this.loadingRequests === 0) {
            this.loaderStateSubject.next(false);
        }
    }
}
