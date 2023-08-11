package com.chat.api.chatapi.controller.model;

import lombok.Data;

@Data
public class ChatMessage {
    private String senderName;
    private String receiverName;
    private String message;
    private MessageType type;
}
