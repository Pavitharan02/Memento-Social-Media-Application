package com.personal.social_media_application.controllers;

import com.personal.social_media_application.models.Friends;
import com.personal.social_media_application.models.Post;
import com.personal.social_media_application.models.User;
import com.personal.social_media_application.services.FriendsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friends")
@CrossOrigin(allowedHeaders = "*" ,origins = "*")
public class FriendsController {
    private final FriendsService friendsService;

    @Autowired
    public FriendsController(FriendsService friendsService) {
        this.friendsService = friendsService;
    }

    @GetMapping("/{uid}")
    public List<Friends> getFriendsByID(@PathVariable Long uid){
        List<Friends> friends = friendsService.getFriendsByUID(uid);
        // Filter out self from friends list
        friends.removeIf(f -> f.getFriends() != null && f.getFriends().getUid().equals(uid));
        return friends;
    }

    @PostMapping
    public ResponseEntity<Friends> addFriend(@RequestBody Friends friend){
        Friends newFriend = friendsService.addFriend(friend);
        return ResponseEntity.status(HttpStatus.CREATED).body(newFriend);
    }

    @DeleteMapping("/{fid}")
    public ResponseEntity<Void> deleteFriend(@PathVariable Long fid) {
        friendsService.deleteFriend(fid);
        return ResponseEntity.noContent().build();
    }
}
