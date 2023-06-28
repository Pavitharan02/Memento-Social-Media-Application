package com.personal.social_media_application.controllers;

import com.personal.social_media_application.models.User;
import com.personal.social_media_application.services.FriendsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friends")
@CrossOrigin(allowedHeaders = "*" ,origins = "*")
public class FriendsController {
    private final FriendsService friendsService;

    public FriendsController(FriendsService friendsService) {
        this.friendsService = friendsService;
    }

    @GetMapping("/{uid}")
    public List<User> getFriendsByID(@PathVariable Long uid){
        List<User> friends = friendsService.getFriendsByUID(uid);
        return friends;
    }
}
