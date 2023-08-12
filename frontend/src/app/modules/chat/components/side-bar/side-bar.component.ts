import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { IUser, UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit, OnDestroy {
    public user?: IUser;
    public chatUsers: IUser[] = [];
    public selectedChannel?: string;
    unsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private userService: UserService,
        private chatService: ChatService
    ) {}

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public ngOnInit(): void {
        this.subscribeToUser();
        this.subscribeToChannel();
        this.subscribeToChatUsers();
    }

    public selectChannel(channel: string): void {
        this.chatService.selectChannel(channel);
    }

    private subscribeToChannel(): void {
        this.chatService.channelObservable
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((channel) => {
                this.selectedChannel = channel;
            });
    }

    private subscribeToUser() {
        this.userService.userObservable
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((user) => {
                this.user = user;
            });
    }

    private subscribeToChatUsers(): void {
        this.chatService.chatUserObservable
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((users) => {
                this.chatUsers = users;
            });
    }
}
