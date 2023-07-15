package com.personal.social_media_application.services;

import com.personal.social_media_application.Repositories.CommentsRepository;
import com.personal.social_media_application.Repositories.PostRepository;
import com.personal.social_media_application.models.Comments;
import com.personal.social_media_application.models.Post;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentsService {
    private final CommentsRepository commentsRepository;
    private final PostRepository postRepository;

    public CommentsService(CommentsRepository commentsRepository, PostRepository postRepository) {
        this.commentsRepository = commentsRepository;
        this.postRepository = postRepository;
    }

    public List<Comments> getAllComments() {
        return commentsRepository.findAll();
    }

    public Comments addComment(Comments comments) {
        return commentsRepository.save(comments);
    }

    public List<Comments> getCommentsByPid(Long pid) {
        return commentsRepository.findCommentsByPost(postRepository.findById(pid).orElse(null));
    }
}

