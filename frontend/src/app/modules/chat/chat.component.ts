import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Subject, filter, takeUntil } from 'rxjs';
import { ChatMessageType, IChatMessage } from 'src/app/contracts/contracts';
import { IUser, UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
    unsubscribe: Subject<void> = new Subject<void>();

    @ViewChild('messageBoard', { static: false }) messageBoard?: ElementRef;

    public user?: IUser;

    public selectedChannel?: string;
    public get chatTitle(): string {
        return this.selectedChannel === 'public'
            ? 'Common Room'
            : this.selectedChannel ?? 'undefined';
    }

    public chatMessage = '';
    messages: IChatMessage[] = [];

    public messageType = ChatMessageType;

    constructor(
        private chatService: ChatService,
        private userService: UserService
    ) {}

    public ngOnInit(): void {
        this.subscribeToUser();
        this.subscribeToChannel();
        this.subscribeToPublicChatMessages();
    }

    private subscribeToChannel(): void {
        this.chatService.channelObservable
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((channel) => {
                this.selectedChannel = channel;
            });
    }

    private subscribeToPublicChatMessages(): void {
        this.chatService.socketConnectionObservable
            .pipe(filter((isConnected) => isConnected === true))
            .subscribe(() =>
                this.chatService.subscribeToTopic(
                    environment.endpoints.publicChat,
                    (message: { body: string }) =>
                        this.onIncomingMessage(JSON.parse(message.body))
                )
            );
    }

    private onIncomingMessage(message: IChatMessage): void {
        this.messages.push(message);

        if (message.type === ChatMessageType.JOIN) {
            this.chatService.addChatUser({ name: message.sender });
        }

        if (this.messageBoard) {
            this.messageBoard.nativeElement.scrollTop =
                this.messageBoard.nativeElement.scrollHeight;
        }
    }

    protected subscribeToUser() {
        this.userService.userObservable
            .pipe(takeUntil(this.unsubscribe))
            .subscribe((user) => {
                if (user) {
                    this.user = user;
                    this.chatService.joinChat(user);
                }
            });
    }

    public isSameSender(index: number): boolean {
        return (
            index > 0 &&
            this.messages[index - 1].sender === this.messages[index].sender &&
            this.messages[index - 1].type === ChatMessageType.MESSAGE
        );
    }

    public messageBoxEnterPressed(event: Event): void {
        if (!(event as KeyboardEvent).shiftKey) {
            event.preventDefault();
            this.sendMessage();
        }
    }

    public sendMessage(): void {
        if (this.chatMessage) {
            this.chatService.sendMessage(environment.endpoints.message, {
                sender: this.user!.name!,
                type: ChatMessageType.MESSAGE,
                message: this.chatMessage,
            });
            this.chatMessage = '';
        }
    }

    public ngOnDestroy(): void {
        if (this.user) {
            this.unsubscribe.next();
            this.unsubscribe.complete();
            this.chatService.leaveChat(this.user);
            this.userService.logout();
        }
    }
}
