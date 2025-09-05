package com.personal.social_media_application.controllers;

import com.personal.social_media_application.models.Likes;
import com.personal.social_media_application.services.LikesService;
import com.personal.social_media_application.services.PostService;
import com.personal.social_media_application.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/likes")
@CrossOrigin(allowedHeaders = "*", origins = "*")
public class LikesController {
    
    private final LikesService likesService;
    private final PostService postService;
    private final UserService userService;

    @Autowired
    public LikesController(LikesService likesService, PostService postService, UserService userService) {
        this.likesService = likesService;
        this.postService = postService;
        this.userService = userService;
    }

    @GetMapping
    public List<Likes> getAllLikes() {
        return likesService.getAllLikes();
    }

    @GetMapping("/post/{postId}")
    public List<Likes> getLikesByPostId(@PathVariable Long postId) {
        return likesService.getLikesByPostId(postId);
    }

    @GetMapping("/count/{postId}")
    public ResponseEntity<Map<String, Long>> getLikeCount(@PathVariable Long postId) {
        long count = likesService.getLikeCountByPostId(postId);
        Map<String, Long> response = new HashMap<>();
        response.put("count", count);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/check/{userId}/{postId}")
    public ResponseEntity<Map<String, Boolean>> checkIfLiked(@PathVariable Long userId, @PathVariable Long postId) {
        boolean isLiked = likesService.isPostLikedByUser(userId, postId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("liked", isLiked);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/toggle")
    public ResponseEntity<Map<String, String>> toggleLike(@RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        Long postId = request.get("postId");
        
        var user = userService.getUserByID(userId);
        var post = postService.getPostById(postId);
        
        if (user == null || post == null) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "User or Post not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
        
        likesService.toggleLike(user, post);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Like toggled successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Likes> addLike(@RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        Long postId = request.get("postId");
        
        var user = userService.getUserByID(userId);
        var post = postService.getPostById(postId);
        
        if (user == null || post == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
        Likes like = new Likes(post, user);
        Likes savedLike = likesService.addLike(like);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLike);
    }

    @DeleteMapping("/{likeId}")
    public ResponseEntity<Map<String, String>> removeLike(@PathVariable Long likeId) {
        likesService.removeLike(likeId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Like removed successfully");
        return ResponseEntity.ok(response);
    }
}
