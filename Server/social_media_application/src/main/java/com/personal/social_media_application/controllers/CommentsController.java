package com.personal.social_media_application.controllers;

import com.personal.social_media_application.models.CommentRequest;
import com.personal.social_media_application.models.Comments;
import com.personal.social_media_application.services.CommentsService;
import com.personal.social_media_application.services.PostService;
import com.personal.social_media_application.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@CrossOrigin(allowedHeaders = "*" ,origins = "*")
public class CommentsController {
    private  final CommentsService commentsService;
    private  final PostService postService;
    private  final UserService userService;

    @Autowired
    public CommentsController(CommentsService commentsService, PostService postService, UserService userService) {
        this.commentsService = commentsService;
        this.postService = postService;
        this.userService = userService;
    }

    @GetMapping
    public List<Comments> getAllComments(){
        return commentsService.getAllComments();
    }

    @GetMapping("/{pid}")
    public List<Comments> getCommentsByPid(@PathVariable Long pid){
        return commentsService.getCommentsByPid(pid);
    }

    @PostMapping("addComment")
    public ResponseEntity<Comments> addComment(@RequestBody CommentRequest commentRequest){
        Comments comments = new Comments();
        comments.setText(commentRequest.getText());
        comments.setPost(postService.getPostById(commentRequest.getPid()));
        comments.setUser(userService.getUserByID(commentRequest.getUid()));
        Comments newComment = commentsService.addComment(comments);
        return ResponseEntity.status(HttpStatus.CREATED).body(newComment);
    }
}
