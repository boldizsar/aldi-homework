import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
    LoaderService,
    SHOW_LOADER_BLACK_LIST,
    SHOW_LOADER_WHITE_LIST,
} from './loader.service';

@Injectable({
    providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private loaderService: LoaderService) {}

    // TODO: Set Basic authentication header
    private setBasicAuthenticationHeader(
        request: HttpRequest<unknown>
    ): HttpRequest<unknown> {
        return request;
    }

    private catchError(
        _request: HttpRequest<unknown>,
        showLoaderFound: boolean
    ): (errorResponse: HttpErrorResponse) => Observable<never> {
        return (errorResponse: HttpErrorResponse) => {
            if (errorResponse.status !== 400 && errorResponse.status !== 401) {
                console.error('errorResponse', errorResponse);
            }

            if (showLoaderFound) {
                this.loaderService.hideLoader();
            }

            return throwError(() => errorResponse);
        };
    }

    private isLoaderNeeded(request: HttpRequest<unknown>): boolean {
        let loaderNeeded = false;

        if (request.urlWithParams.includes(environment.apiUrl)) {
            for (const item of SHOW_LOADER_WHITE_LIST) {
                if (request.urlWithParams.includes(item)) {
                    loaderNeeded = true;
                }
            }
            for (const blackListedApi of SHOW_LOADER_BLACK_LIST) {
                if (request.urlWithParams.includes(blackListedApi)) {
                    loaderNeeded = false;
                }
            }
        }

        return loaderNeeded;
    }

    private digestResponse(
        isLoaderNeeded: boolean
    ): (response: HttpEvent<unknown>) => HttpEvent<unknown> {
        return (response) => {
            if (response instanceof HttpResponse && isLoaderNeeded) {
                this.loaderService.hideLoader();
            }

            return response;
        };
    }

    public intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        request = this.setBasicAuthenticationHeader(request);
        const isLoaderNeeded = this.isLoaderNeeded(request);

        if (isLoaderNeeded) {
            this.loaderService.showLoader();
        }

        return next
            .handle(request)
            .pipe(
                tap(this.digestResponse(isLoaderNeeded)),
                catchError(this.catchError(request, isLoaderNeeded))
            );
    }
}
