package com.personal.social_media_application.Repositories;

import com.personal.social_media_application.models.Friends;
import com.personal.social_media_application.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FriendsRepository extends JpaRepository<Friends, Long>{
    @Query("SELECT f.friends FROM Friends f WHERE f.user.uid = :uid")
    List<User> findFriendsByUID(@Param("uid") Long uid);
}
