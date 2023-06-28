package com.personal.social_media_application.services;

import com.personal.social_media_application.Repositories.PostRepository;
import com.personal.social_media_application.models.Post;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
}
