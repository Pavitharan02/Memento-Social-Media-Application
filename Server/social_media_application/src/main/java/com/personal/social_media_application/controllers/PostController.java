package com.personal.social_media_application.controllers;

import com.personal.social_media_application.models.Post;
import com.personal.social_media_application.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
@CrossOrigin(allowedHeaders = "*" ,origins = "*")
public class PostController {
    private  final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<Post> getAllPosts(){
        return postService.getAllPosts();
    }

    @PostMapping("addpost")
    public ResponseEntity<Post> addPost(@RequestBody Post post){
        Post newPost = postService.addPost(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(newPost);
    }
}
