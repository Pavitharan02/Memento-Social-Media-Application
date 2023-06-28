package com.personal.social_media_application.Repositories;


import com.personal.social_media_application.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
