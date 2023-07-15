package com.personal.social_media_application.models;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "comments")
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
