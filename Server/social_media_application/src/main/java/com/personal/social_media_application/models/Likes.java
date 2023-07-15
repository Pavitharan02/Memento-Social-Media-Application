package com.personal.social_media_application.models;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "likes")
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lid;

    @ManyToOne
    @JoinColumn(name = "pid")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "uid")
    private User user;

    public Likes() {
    }

    public Likes(Post post, User user) {
        this.post = post;
        this.user = user;
    }

}
