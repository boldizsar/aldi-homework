import { Component } from '@angular/core';
import { UserDirective } from 'src/app/directives/user.directive';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent extends UserDirective {
    public message = '';

    constructor(
        private apiService: ApiService,
        protected override userService: UserService
    ) {
        super(userService);
    }

    public messageBoxEnterPressed(event: Event): void {
        if (!(event as KeyboardEvent).shiftKey) {
            event.preventDefault();
            this.sendMessage();
        }
    }

    public sendMessage(): void {
        this.message = '';
        // TODO: Implement this method
    }
}
