package com.personal.social_media_application.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostRequest {
    private Long userid;
    private String description;
    private String picturePath;
}
