package com.personal.social_media_application.models;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Builder
@Getter
@Setter
@Entity
@Table(name = "user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String picturePath;
    private String location;
    private String occupation;
    private long viewedProfile;
    private long impressions;

    @Enumerated(EnumType.STRING)
    private Role role;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public User() {
    }

    public User(Long uid, String firstName, String lastName, String email, String password, String picturePath, String location, String occupation, long viewedProfile, long impressions, Role role, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.uid = uid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.picturePath = picturePath;
        this.location = location;
        this.occupation = occupation;
        this.viewedProfile = viewedProfile;
        this.impressions = impressions;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public User(String firstName, String lastName, String email, String password, String picturePath, String location, String occupation, long viewedProfile, long impressions, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.picturePath = picturePath;
        this.location = location;
        this.occupation = occupation;
        this.viewedProfile = viewedProfile;
        this.impressions = impressions;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
