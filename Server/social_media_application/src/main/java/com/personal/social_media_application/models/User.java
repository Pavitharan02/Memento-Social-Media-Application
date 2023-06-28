package com.personal.social_media_application.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "user")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;
    private String firstName;
    private String lastName;
    private String email;
    private String picturePath;
    private String location;
    private String occupation;
    private long viewedProfile;
    private long impressions;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public User() {
    }

    public User(String firstName, String lastName, String email, String picturePath, String location, String occupation, long viewedProfile, long impressions, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.picturePath = picturePath;
        this.location = location;
        this.occupation = occupation;
        this.viewedProfile = viewedProfile;
        this.impressions = impressions;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
