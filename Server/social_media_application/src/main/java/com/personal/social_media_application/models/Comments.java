package com.personal.social_media_application.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cid;

    private String text;

    @ManyToOne
    @JoinColumn(name = "pid")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "uid")
    private User user;

    public Comments() {
    }

    public Comments(String text, Post post, User user) {
        this.text = text;
        this.post = post;
        this.user = user;
    }
}
