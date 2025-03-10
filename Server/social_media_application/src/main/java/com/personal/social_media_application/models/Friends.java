package com.personal.social_media_application.models;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "friends")
public class Friends {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fid;

    @ManyToOne
    @JoinColumn(name = "uid")
    private User user;

    @ManyToOne
    @JoinColumn(name = "friend")
    private User friends;

    public Friends() {
    }

    public Friends(User user, User friends) {
        this.user = user;
        this.friends = friends;
    }

}
