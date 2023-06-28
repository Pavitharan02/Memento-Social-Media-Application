package com.personal.social_media_application.controllers;

import com.personal.social_media_application.models.Post;
import com.personal.social_media_application.services.PostService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/post")
@CrossOrigin(allowedHeaders = "*" ,origins = "*")
public class PostController {
    private  final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<Post> getAllPosts(){
        return postService.getAllPosts();
    }
}
