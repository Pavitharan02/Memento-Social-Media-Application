package com.personal.social_media_application.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequest {
    private String text;
    private Long pid;
    private Long uid;
}
