import { ApiService } from './../../../services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    constructor(private apiService: ApiService) {}
}
