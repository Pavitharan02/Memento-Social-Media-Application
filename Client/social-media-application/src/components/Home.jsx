import React, { useState, useEffect } from "react";
import './Home.css'
import NewPost from "./NewPost";
import Posts from "./Posts";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

const Home = () => {
    // const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState("");
    const [friends, setFriends] = useState([]);
    const [posts, setPosts] = useState("");
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const uid = localStorage.getItem("userId");
    const navigate = useNavigate();

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

    const handleSearchChange = async (e) => {
      const value = e.target.value;
      setSearch(value);
      if (value.trim() === "") {
        setSearchResults([]);
        return;
      }
      try {
        const jwt = localStorage.getItem("jwt");
        const response = await fetch(`http://localhost:8080/user/search?query=${encodeURIComponent(value)}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        setSearchResults([]);
      }
    };

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("userId");
        window.location.href = "/";
    };
  
    return (        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 title"><img src="https://i.ibb.co/d5ZRfCh/MEMENTO-LOGO.png" className="img-fluid" alt="This is logo" style={{marginBottom: "10px"}}/></div>
            <div className="col-md-8" style={{paddingTop: "15px", position: 'relative'}}>
              <input placeholder="Search..." value={search} onChange={handleSearchChange} />
              {searchResults.length > 0 && (
                <div className="search-results" style={{position: 'absolute', background: 'white', zIndex: 10, width: '100%', border: '1px solid #ccc', borderRadius: '4px'}}>
                  {searchResults.map((u) => (
                    <div key={u.uid} style={{padding: '8px', borderBottom: '1px solid #eee', cursor: 'pointer'}}
                      onClick={() => navigate(`/profile/${u.uid}`)}>
                      <span>{u.firstName} {u.lastName} ({u.email})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="col-md-2">
                <div className="d-flex justify-content-end align-items-center" style={{height: "100%", paddingTop: "15px"}}>
                <div><i className="fa fa-bell hand-hover" aria-hidden="true"></i></div>
                <div><i style={{marginLeft: "15px"}} className="fa fa-question-circle hand-hover" aria-hidden="true"></i></div>
                <button className="btn btn-danger btn-sm" onClick={handleLogout} style={{marginLeft: "15px", backgroundColor: "#dc3545", color: "#fff", border: "none"}}>
                  <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
                </button>
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
                  <div key={friend.fid} className="d-flex align-items-center justify-content-between" style={{marginBottom: '8px'}}>
                    <div>{friend.friends.firstName+" "+friend.friends.lastName}</div>
                    <button className="btn btn-outline-danger btn-sm" onClick={async () => {
                      const jwt = localStorage.getItem("jwt");
                      await fetch(`http://localhost:8080/friends/${friend.fid}`, {
                        method: "DELETE",
                        headers: {
                          Authorization: `Bearer ${jwt}`,
                          "Content-Type": "application/json",
                        },
                      });
                      setFriends(friends.filter(f => f.fid !== friend.fid));
                    }}>Unfriend</button>
                  </div>
                ))}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <NewPost user={user}/>
              <Posts user={user} posts={posts}/>
              </div>
                
            <div className="col-md-1" ></div>
          </div>
        </div>
      );
  };
  
  export default Home;