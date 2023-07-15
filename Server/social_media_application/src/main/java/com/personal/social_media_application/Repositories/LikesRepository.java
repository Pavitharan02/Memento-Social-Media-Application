package com.personal.social_media_application.Repositories;

import com.personal.social_media_application.models.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikesRepository extends JpaRepository<Likes,Long> {

}
