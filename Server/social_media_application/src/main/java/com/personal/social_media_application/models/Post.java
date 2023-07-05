package com.personal.social_media_application.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "post")
@Getter
@Setter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pid;

    @ManyToOne
    @JoinColumn(name = "uid")
    private User user;

    private String description;

    private String picturePath;

    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Post() {
    }

    public Post(User user, String description, String picturePath, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.user = user;
        this.description = description;
        this.picturePath = picturePath;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Post(User user, String description, String picturePath) {
        this.user = user;
        this.description = description;
        this.picturePath = picturePath;
    }
}
