package com.personal.social_media_application.controllers;

import com.personal.social_media_application.models.Comments;
import com.personal.social_media_application.services.CommentsService;
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

    @Autowired
    public CommentsController(CommentsService commentsService) {
        this.commentsService = commentsService;
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
    public ResponseEntity<Comments> addPost(@RequestBody Comments comments){
        Comments newComment = commentsService.addComment(comments);
        return ResponseEntity.status(HttpStatus.CREATED).body(newComment);
    }
}
