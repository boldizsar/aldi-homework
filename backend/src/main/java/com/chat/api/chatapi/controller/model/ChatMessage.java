package com.chat.api.chatapi.controller.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
    private String sender;
    private String receiver;
    private String message;
    private MessageType type;
}
