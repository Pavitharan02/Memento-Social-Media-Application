package com.personal.social_media_application.services;

import com.personal.social_media_application.Repositories.FriendsRepository;
import com.personal.social_media_application.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendsService {

    private final FriendsRepository friendsRepository;

    public FriendsService(FriendsRepository friendsRepository) {
        this.friendsRepository = friendsRepository;
    }

    public List<User> getFriendsByUID(Long uid) {
        List<User> friends = friendsRepository.findFriendsByUID(uid);
        return friends;
    }
}
