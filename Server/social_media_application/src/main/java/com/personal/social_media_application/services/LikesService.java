package com.personal.social_media_application.services;

import com.personal.social_media_application.Repositories.LikesRepository;
import com.personal.social_media_application.models.Likes;
import com.personal.social_media_application.models.Post;
import com.personal.social_media_application.models.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikesService {
    
    private final LikesRepository likesRepository;

    public LikesService(LikesRepository likesRepository) {
        this.likesRepository = likesRepository;
    }

    public List<Likes> getAllLikes() {
        return likesRepository.findAll();
    }

    public List<Likes> getLikesByPostId(Long postId) {
        return likesRepository.findByPostPid(postId);
    }

    public Optional<Likes> getLikeByUserAndPost(Long userId, Long postId) {
        return likesRepository.findByUserUidAndPostPid(userId, postId);
    }

    public Likes addLike(Likes like) {
        return likesRepository.save(like);
    }

    public void removeLike(Long likeId) {
        likesRepository.deleteById(likeId);
    }

    public void toggleLike(User user, Post post) {
        Optional<Likes> existingLike = likesRepository.findByUserUidAndPostPid(user.getUid(), post.getPid());
        
        if (existingLike.isPresent()) {
            // Unlike: remove the like
            likesRepository.delete(existingLike.get());
        } else {
            // Like: add new like
            Likes newLike = new Likes(post, user);
            likesRepository.save(newLike);
        }
    }

    public long getLikeCountByPostId(Long postId) {
        return likesRepository.countByPostPid(postId);
    }

    public boolean isPostLikedByUser(Long userId, Long postId) {
        return likesRepository.findByUserUidAndPostPid(userId, postId).isPresent();
    }
}
