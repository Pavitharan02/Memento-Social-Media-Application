package com.personal.social_media_application.Repositories;

import com.personal.social_media_application.models.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LikesRepository extends JpaRepository<Likes,Long> {
    
    @Query("SELECT l FROM Likes l WHERE l.post.pid = :postId")
    List<Likes> findByPostPid(@Param("postId") Long postId);
    
    @Query("SELECT l FROM Likes l WHERE l.user.uid = :userId AND l.post.pid = :postId")
    Optional<Likes> findByUserUidAndPostPid(@Param("userId") Long userId, @Param("postId") Long postId);
    
    @Query("SELECT COUNT(l) FROM Likes l WHERE l.post.pid = :postId")
    long countByPostPid(@Param("postId") Long postId);
}
