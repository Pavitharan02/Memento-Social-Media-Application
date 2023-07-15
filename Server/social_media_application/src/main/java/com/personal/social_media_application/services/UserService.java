package com.personal.social_media_application.services;

import com.personal.social_media_application.Repositories.UserRepository;
import com.personal.social_media_application.models.User;
import org.springframework.stereotype.Service;



@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByID(Long uid) {
        User user = userRepository.findById(uid).orElse(null);
        return user;
    }
}
