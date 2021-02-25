package com.p565sp21group1.patientmanagerspring.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name="Message")
public class Message
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @NotBlank(message = "Message cannot be blank")
    private String content;

    public Message() {
    }

    public Long getMessageId() {
        return messageId;
    }

    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
