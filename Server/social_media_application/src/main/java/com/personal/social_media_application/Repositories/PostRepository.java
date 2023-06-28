package com.personal.social_media_application.Repositories;

import com.personal.social_media_application.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post,Long> {
}
