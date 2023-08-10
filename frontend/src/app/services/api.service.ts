import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = environment.apiUrl + '/';

    constructor(private http: HttpClient) {}

    public static generateHttpParams(urlParams: {
        [key: string]: string;
    }): HttpParams {
        let params = new HttpParams();

        if (!urlParams) {
            return params;
        }

        Object.entries(urlParams).forEach(([key, value]) => {
            params = params.append(key, value);
        });

        return params;
    }

    public post<T>(queryString: string, payload: unknown): Observable<T> {
        return this.http.post<T>(this.apiUrl + queryString, payload);
    }

    public get<T>(
        queryString: string,
        queryParams?: { [key: string]: string }
    ): Observable<T> {
        const params: HttpParams | undefined =
            queryParams != null
                ? ApiService.generateHttpParams(queryParams)
                : undefined;

        return this.http.get<T>(this.apiUrl + queryString, { params });
    }

    public put<T>(queryString: string, payload: unknown): Observable<T> {
        return this.http.put<T>(this.apiUrl + queryString, payload);
    }

    public delete<T>(
        queryString: string,
        queryParams?: { [key: string]: string }
    ): Observable<T> {
        const params: HttpParams | undefined =
            queryParams != null
                ? ApiService.generateHttpParams(queryParams)
                : undefined;

        return this.http.delete<T>(this.apiUrl + queryString, { params });
    }
}
