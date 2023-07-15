package com.personal.social_media_application.Repositories;

import com.personal.social_media_application.models.Comments;
import com.personal.social_media_application.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comments,Long> {
    List<Comments> findCommentsByPost(Post post);
}