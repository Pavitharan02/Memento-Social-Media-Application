import React from "react";
import { useState,useEffect } from "react";
import './Home.css'
import NewPost from "./NewPost";
import Posts from "./Posts";
import Profile from "./Profile";

const Home = () => {
    // const [loggedIn, setLoggedIn] = useState(false);

    const [user, setUser] = useState("");
    const [friends, setFriends] = useState("");
    const [posts, setPosts] = useState("");
    const uid = 1;

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await fetch(`http://localhost:8080/user/${uid}`);
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
            const response = await fetch(`http://localhost:8080/friends/${uid}`);
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
            const response = await fetch(`http://localhost:8080/post`);
            const data = await response.json();
            const fetchedPosts = data;
            setPosts(fetchedPosts);
          } catch (error) {
            console.error("Error fetching Posts:", error);
          }
        };
        fetchPosts();
      }, [uid]);
  
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 title"><img src="https://i.ibb.co/d5ZRfCh/MEMENTO-LOGO.png" className="img-fluid" alt="This is logo" style={{marginBottom: "10px"}}/></div>
            <div className="col-md-9" style={{paddingTop: "15px"}}><input placeholder="Search..."></input></div>
            <div className="col-md-1">
                <div className="d-flex justify-content-end">
                <div><i className="fa fa-bell" aria-hidden="true"></i></div>
                <div><i style={{marginLeft: "10px"}} className="fa fa-question-circle" aria-hidden="true"></i></div>
                </div>
            </div>
          </div>
          <div className="row" style={{backgroundColor: "lightgrey",paddingBottom: "10px"}}>
            <div className="col-md-1"></div>
            <div className="col-md-4">
              <Profile user={user}/>
              <div className="container subcont">
                <b>Friends List</b>
                <ul>
                {Array.isArray(friends) ? (
                friends.map((item) => <li key={item.uid}>{item.firstName+" "+item.lastName}</li>)
                ) : (
                <li>No friends data available</li>
                )}
                </ul>
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