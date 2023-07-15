package com.personal.social_media_application.controllers;

import com.personal.social_media_application.models.User;
import com.personal.social_media_application.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(allowedHeaders = "*" ,origins = "*")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{uid}")
    public User getUserByID(@PathVariable Long uid){
        User user = userService.getUserByID(uid);
        return user;
    }
}
