import React, { useState, useEffect } from "react";
import './Home.css'
import NewPost from "./NewPost";
import Posts from "./Posts";
import Profile from "./Profile";

const Home = () => {
    // const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState("");
    const [friends, setFriends] = useState([]);
    const [posts, setPosts] = useState("");
    const uid = localStorage.getItem("userId");

    useEffect(() => {
      const jwt = localStorage.getItem("jwt");
      const userId = localStorage.getItem("userId");
      
      // Redirect to login if no authentication data
      if (!jwt || !userId) {
        window.location.href = "/";
        return;
      }
      
      console.log(`Bearer ${jwt}`);

        const fetchUser = async () => {
          try {
            const response = await fetch(`http://localhost:8080/user/${uid}`, {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json", // Set the appropriate content type if needed
            },
          });

          if (!response.ok) {
            // Handle the case when the response status is not in the 200-299 range
            throw new Error("Failed to fetch user data");
          }

          const data = await response.json();
          const fetchedUser = data;
          setUser(fetchedUser);
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        };
        fetchUser();
        const fetchFriends = async () => {
          try {
            const response = await fetch(`http://localhost:8080/friends/${uid}`, {
              headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            const fetchedFriends = data;
            setFriends(fetchedFriends);
          } catch (error) {
            console.error("Error fetching Friends:", error);
          }
        };
        fetchFriends();
        const fetchPosts = async () => {
          try {
            const response = await fetch(`http://localhost:8080/post`, {
              headers: {
                Authorization: `Bearer ${jwt}`,
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            const fetchedPosts = data;
            setPosts(fetchedPosts);          } catch (error) {
            console.error("Error fetching Posts:", error);
          }
        };
        fetchPosts();
      }, [uid]);

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("userId");
        window.location.href = "/";
    };
  
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12" style={{padding: "20px", borderBottom: "1px solid #ddd"}}>
              <div className="d-flex justify-content-between align-items-center">
                <h2>Social Media App</h2>
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 title"><img src="https://i.ibb.co/d5ZRfCh/MEMENTO-LOGO.png" className="img-fluid" alt="This is logo" style={{marginBottom: "10px"}}/></div>
            <div className="col-md-9" style={{paddingTop: "15px"}}><input placeholder="Search..."></input></div>
            <div className="col-md-1">
                <div className="d-flex justify-content-end">
                <div><i className="fa fa-bell hand-hover" aria-hidden="true"></i></div>
                <div><i style={{marginLeft: "10px"}} className="fa fa-question-circle hand-hover" aria-hidden="true"></i></div>
                </div>
            </div>
          </div>
          <div className="row" style={{backgroundColor: "lightgrey",paddingBottom: "10px"}}>
            <div className="col-md-1"></div>
            <div className="col-md-4">
              <div><Profile user={user}/></div>
              <div className="container homesubcont">
                <b style={{fontSize: "17px"}}>Friends List</b>
                <hr></hr>
                <div style={{marginTop: "5px"}}>
                {friends.map((friend) => (
                  <div key={friend.fid}>
                    <div>{friend.friends.firstName+" "+friend.friends.lastName}</div>
                  </div>
                ))}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <NewPost uid={uid}/>
              <Posts user={user} posts={posts}/>
              </div>
                
            <div className="col-md-1" ></div>
          </div>
        </div>
      );
  };
  
  export default Home;