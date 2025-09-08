import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Profile from "./Profile";

const UserProfile = () => {
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const [loading, setLoading] = useState(true);
  const myUid = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch(`http://localhost:8080/user/${uid}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    };
    const checkFriend = async () => {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch(`http://localhost:8080/friends/${myUid}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setIsFriend(data.some(f => f.friends && f.friends.uid === parseInt(uid)));
      }
      setLoading(false);
    };
    fetchUser();
    checkFriend();
  }, [uid, myUid]);

  const handleAddFriend = async () => {
    const jwt = localStorage.getItem("jwt");
    const response = await fetch("http://localhost:8080/friends", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { uid: parseInt(myUid) }, friends: { uid: parseInt(uid) } }),
    });
    if (response.ok) {
      setIsFriend(true);
    }
  };

  if (loading || !user) return <div className="user-profile-page"><div className="user-profile-card">Loading...</div></div>;
  return (
    <div className="user-profile-page">
      <div className="user-profile-card">
        <div className="user-profile-header">
          <h2>{user.firstName} {user.lastName}</h2>
          <p>{user.email}</p>
        </div>
        <Profile user={user} />
        {!isFriend && myUid !== uid && (
          <div className="user-profile-add-friend">
            <button className="btn btn-primary" onClick={handleAddFriend}>Add Friend</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
