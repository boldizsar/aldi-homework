import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Stomp, CompatClient, StompSubscription } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import { ChatMessageType, IChatMessage } from '../contracts/contracts';
import { IUser } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    private stompClient: CompatClient;
    private socketConnectionSubject = new BehaviorSubject<boolean>(false);
    private subscriptions?: StompSubscription[];

    public socketConnectionObservable =
        this.socketConnectionSubject.asObservable();

    private chatUsers: IUser[] = [];
    private chatUserSubject = new BehaviorSubject<IUser[]>(this.chatUsers);
    public chatUserObservable = this.chatUserSubject.asObservable();

    private channelSubject = new BehaviorSubject<string>('public');
    public channelObservable = this.channelSubject.asObservable();

    constructor() {
        this.stompClient = Stomp.over(
            () =>
                new SockJS(
                    environment.apiUrl + '/' + environment.endpoints.websocket
                )
        );
    }

    public joinChat(user: IUser): void {
        this.connect(user);
    }

    public leaveChat(user: IUser): void {
        this.sendMessage(environment.endpoints.message, {
            sender: user.name,
            type: ChatMessageType.LEAVE,
            message: '',
        });

        this.disconnectWebSocket();
    }

    public selectChannel(channel: string): void {
        this.channelSubject.next(channel);
    }

    public addChatUser(user: IUser): void {
        const index = this.chatUsers.findIndex(
            (_user) => _user.name === user.name
        );
        if (index === -1) {
            this.chatUsers.push(user);
            this.chatUserSubject.next(this.chatUsers);
        }
    }

    public removeChatUser(user: IUser): void {
        const index = this.chatUsers.findIndex(
            (_user) => _user.name === user.name
        );
        if (index >= 0) {
            this.chatUsers.splice(index, 1);
        }
        this.chatUserSubject.next(this.chatUsers);
    }

    public sendMessage(
        topic: string,
        message: Omit<IChatMessage, 'receiver'>
    ): void {
        const chatMessage: IChatMessage = {
            ...message,
            receiver: this.channelSubject.value,
        };
        this.stompClient.publish({
            destination: topic,
            body: JSON.stringify(chatMessage),
        });
    }

    public subscribeToTopic(
        topic: string,
        callback: (message: { body: string }) => void
    ): void {
        const sub = this.stompClient.subscribe(
            topic,
            (message: { body: string }) => {
                callback(message);
            }
        );
        this.subscriptions?.push(sub);
    }

    private connect(user: IUser): void {
        if (!this.stompClient.connected) {
            this.stompClient.connect(
                {},
                () => {
                    this.onConnection(user);
                },
                this.onError
            );
        }
    }

    private onConnection(user: IUser): void {
        this.socketConnectionSubject.next(true);
        this.sendMessage(environment.endpoints.message, {
            sender: user.name,
            type: ChatMessageType.JOIN,
            message: '',
        });
    }

    private onError = (error: unknown): void => {
        this.socketConnectionSubject.next(false);
        console.error(error);
    };

    private disconnectWebSocket(): void {
        this.subscriptions?.forEach((sub) => sub.unsubscribe());
        this.stompClient?.deactivate();
    }
}
