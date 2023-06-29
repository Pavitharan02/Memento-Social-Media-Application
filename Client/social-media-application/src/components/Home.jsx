import React from "react";
import { useState,useEffect } from "react";
import './Home.css'

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
            <div className="col-md-2 title"><h2>Memento</h2></div>
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
              <div className="container subcont">
                <div className="row">
                <div className="col-md-2">
                <img src="https://pyxis.nymag.com/v1/imgs/bca/465/a386aa2ea7d13400dd69b6237ad1407f53-01-tom-cruise.rhorizontal.w700.jpg" alt="profile_img" className="imgsty"/>
                </div>
                <div className="col-md-8">
                <div style={{marginTop: "20px"}}><b>{user.firstName+" "+user.lastName}</b></div>
                <div>0 friends</div>
                </div>
                <div className="col-md-2" style={{marginTop: "50px"}}><i className="fa fa-cog" aria-hidden="true"></i></div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="boxtext"><i style={{marginLeft: "10px"}} className="fa fa-map-marker" aria-hidden="true"><span className="boxtext">{user.location}</span></i><br></br>
                  <i style={{marginLeft: "10px"}} className="fa fa-suitcase" aria-hidden="true"><span className="boxtext">{user.occupation}</span></i>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="boxtext">Who viewed your profile:<b>{" "+user.viewedProfile}</b><br></br>Impressions of your post:<b>{" "+user.impressions}</b></div>
                </div>
                <hr></hr>
                <div style={{paddingLeft: "5px"}}><b>Social Profiles</b></div>
                <div className="row">
                  <div className="col-md-1">i</div>
                  <div className="col-md-9">
                  <div className="row boxtext">Twitter<br></br>Social Network</div>
                  </div>
                  <div className="col-2"><i className="fa fa-pen" aria-hidden="true"></i></div>
                </div>
                <div className="row">
                  <div className="col-md-1">i</div>
                  <div className="col-md-9">
                  <div className="row boxtext">LinkedIn<br></br>Network Platform</div>
                  </div>
                  <div className="col-2"><i className="fa fa-pen" aria-hidden="true"></i></div>
                </div>
              </div>
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
              <div className="container subcont">
                <div className="row">
                <div className="col-md-1">
                <img src="https://pyxis.nymag.com/v1/imgs/bca/465/a386aa2ea7d13400dd69b6237ad1407f53-01-tom-cruise.rhorizontal.w700.jpg" alt="profile_img" className="imgsty" />
                </div>
                <div className="col-md-11">
                <input type={"text"} placeholder="What's on your mind..." style={{marginTop: "25px",width: "100%",height: "50px"}}></input>
                </div>
                </div>
                <hr></hr>
                <div className="row boxtext justify-content-between" style={{marginRight: "25px",paddingBottom: "10px"}}>
                  <div><i style={{marginRight: "8px"}} className="fa fa-image" aria-hidden="true"></i>Image</div>
                  <div><i style={{marginRight: "8px"}} className="fa fa-video" aria-hidden="true"></i>Clip</div>
                  <div><i style={{marginRight: "8px"}} className="fa fa-paperclip" aria-hidden="true"></i>Attachment</div>
                  <div><i style={{marginRight: "8px"}} className="fa fa-microphone" aria-hidden="true"></i>Audio</div>
                </div>
              </div>
              
                {Array.isArray(posts) ? (
                posts.map((item) => 
                <>
                <div className="container subcont">
                <div className="row">
                <div className="col-md-1">
                <img src="https://pyxis.nymag.com/v1/imgs/bca/465/a386aa2ea7d13400dd69b6237ad1407f53-01-tom-cruise.rhorizontal.w700.jpg" alt="profile_img" className="imgsty"/>
                </div>
                <div className="col-md-9">
                <div className="boxtext" style={{marginTop: "20px"}}>{user.firstName+" "+user.lastName}</div>
                <div className="boxtext">{user.location}</div>
                </div>
                <div className="col-md-2"><div><i className="fa fa-user-friends" aria-hidden="true"></i></div></div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="boxtext col">
                <div>{item.description}</div>
                <img style={{ width: "100%", marginTop: "10px" }} src={item.picturePath} alt="post_img" className="postimg" />
                </div>
                </div>
                
                <hr></hr>
                <div>
                <div className="row boxtext justify-content-around" style={{paddingBottom: "15px"}}>
                  <div><i style={{marginRight: "8px"}} className="fa fa-thumbs-up" aria-hidden="true"></i>Like</div>
                  <div><i style={{marginRight: "8px"}} className="fa fa-comment" aria-hidden="true"></i>Comment</div>
                </div>
                </div>
                </div>
                </>
                  )
                  ) : (
                  "No posts data available"
                  )}
                  
                </div>
                
            <div className="col-md-1" ></div>
          </div>
        </div>
      );
  };
  
  export default Home;