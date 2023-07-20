package com.personal.social_media_application.controllers;

import com.personal.social_media_application.models.Post;
import com.personal.social_media_application.models.PostRequest;
import com.personal.social_media_application.services.PostService;
import com.personal.social_media_application.services.UserService;
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
    private  final UserService userService;

    @Autowired
    public PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @GetMapping
    public List<Post> getAllPosts(){
        return postService.getAllPosts();
    }

    @PostMapping("add-post")
    public ResponseEntity<Post> addPost(@RequestBody PostRequest postRequest){
        Post post = new Post();
        post.setUser(userService.getUserByID(postRequest.getUserid()));
        post.setDescription(postRequest.getDescription());
        post.setPicturePath(postRequest.getPicturePath());
        Post newPost = postService.addPost(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(newPost);
    }
}
