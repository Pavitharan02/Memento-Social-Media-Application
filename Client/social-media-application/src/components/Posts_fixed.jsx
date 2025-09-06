import React, { useState, useEffect } from "react";
import './Posts.css';

const Posts = ({user,posts}) => {
    const [commentVisibility, setCommentVisibility] = useState([]);
    const [comment,setComment] = useState([]);
    const [postComments, setPostcomments] = useState([]);
    const [likeCounts, setLikeCounts] = useState({});
    const [userLikes, setUserLikes] = useState({});

    const handleComment = (e) => {
        setComment(e.target.value);
    }

    const addComment = async(pid) => {
        const jwt = localStorage.getItem("jwt");
        const userId = localStorage.getItem("userId");
        
        const formData = new FormData();
        formData.append('text', comment);
        formData.append('pid', pid);
        formData.append('uid', userId);

        const jsonObject = {};
        formData.forEach((value, key) => {
            jsonObject[key] = value;
        });

        console.log(jsonObject);

        fetch('http://localhost:8080/comment/addComment', {
            method: "POST",
            body: JSON.stringify(jsonObject),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Response from backend:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

        window.location.reload();
    }

    const addFriend = async(friendId) => {
        const jwt = localStorage.getItem("jwt");
        const userId = localStorage.getItem("userId");
        
        const requestBody = {
            user: { uid: parseInt(userId) },
            friends: { uid: friendId }
        };

        try {
            const response = await fetch('http://localhost:8080/friends', {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`,
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log("Friend added successfully:", data);
                window.location.reload();
            } else {
                console.error("Failed to add friend:", response.statusText);
            }
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    }

    const handleButton = async (index, pid) => {
        const jwt = localStorage.getItem("jwt");
        const newVisibility = [...commentVisibility];
        newVisibility[index] = !newVisibility[index];
        setCommentVisibility(newVisibility);

        const response = await fetch(`http://localhost:8080/comment/${pid}`, {
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        const fetchedComments = data;

        // Update the postComments array using pid as index
        setPostcomments((prevComments) => {
            const updatedComments = [...prevComments];
            updatedComments[pid] = fetchedComments;
            return updatedComments;
        });
    }

    // Load like counts and user likes when component mounts
    useEffect(() => {
        if (Array.isArray(posts) && posts.length > 0) {
            const jwt = localStorage.getItem("jwt");
            const userId = localStorage.getItem("userId");
            
            posts.forEach(async (post) => {
                // Fetch like count
                try {
                    const countResponse = await fetch(`http://localhost:8080/likes/count/${post.pid}`, {
                        headers: {
                            "Authorization": `Bearer ${jwt}`,
                            "Content-Type": "application/json",
                        },
                    });
                    const countData = await countResponse.json();
                    setLikeCounts(prev => ({...prev, [post.pid]: countData.count}));
                    
                    // Check if user liked this post
                    const likeCheckResponse = await fetch(`http://localhost:8080/likes/check/${userId}/${post.pid}`, {
                        headers: {
                            "Authorization": `Bearer ${jwt}`,
                            "Content-Type": "application/json",
                        },
                    });
                    const likeData = await likeCheckResponse.json();
                    setUserLikes(prev => ({...prev, [post.pid]: likeData.liked}));
                } catch (error) {
                    console.error("Error fetching like data:", error);
                }
            });
        }
    }, [posts]);

    const handleLike = async (postId) => {
        const jwt = localStorage.getItem("jwt");
        const userId = localStorage.getItem("userId");
        
        try {
            const response = await fetch('http://localhost:8080/likes/toggle', {
                method: "POST",
                body: JSON.stringify({
                    userId: parseInt(userId),
                    postId: postId
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`,
                },
            });
            
            if (response.ok) {
                // Toggle the like state locally
                const wasLiked = userLikes[postId] || false;
                setUserLikes(prev => ({...prev, [postId]: !wasLiked}));
                
                // Update like count
                const currentCount = likeCounts[postId] || 0;
                setLikeCounts(prev => ({
                    ...prev, 
                    [postId]: wasLiked ? currentCount - 1 : currentCount + 1
                }));
            } else {
                console.error("Failed to toggle like:", response.statusText);
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    }

    return(
        <div>
            {Array.isArray(posts) ? (
                posts.map((item, index) => {
                    return(
                        <div key={index} className="container postsubcont">
                            <div className="row">
                                <div className="col-md-1">
                                    <img src={item.user.picturePath} alt="profile_img" className="imgsty" />
                                </div>
                                <div className="col-md-9">
                                    <div className="boxtext" style={{ marginTop: "20px" }}>{item.user.firstName} {item.user.lastName}</div>
                                    <div className="boxtext">{item.user.location}</div>
                                </div>
                                <div className="col-md-2">
                                    <div className="hand-hover">
                                        <i 
                                            className="fa fa-user-friends" 
                                            aria-hidden="true" 
                                            onClick={() => addFriend(item.user.uid)}
                                        ></i>
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <div className="row">
                                <div className="boxtext col">
                                    <div>{item.description}</div>
                                    <img style={{ width: "100%", marginTop: "10px" }} src={window.location.origin + item.picturePath} alt="post_img" className="postimg" />
                                </div>
                            </div>
                            <hr></hr>
                            <div>
                                <div className="row boxtext justify-content-around">
                                    <button 
                                        className={`hand-hover like-button ${userLikes[item.pid] ? 'liked' : ''}`} 
                                        onClick={() => handleLike(item.pid)}
                                    >
                                        <i style={{ marginRight: "8px"}} className="fa fa-thumbs-up" aria-hidden="true"></i>
                                        Like {likeCounts[item.pid] ? `(${likeCounts[item.pid]})` : ''}
                                    </button>
                                    <button 
                                        className={`hand-hover like-button ${commentVisibility[index] ? 'liked' : ''}`} 
                                        onClick={() => handleButton(index,item.pid)}
                                    >
                                        <i style={{ marginRight: "8px" }} className="fa fa-comment" aria-hidden="true"></i>Comment
                                    </button>
                                </div>
                            </div>
                            <hr></hr>
                            {commentVisibility[index] && (
                                <div className="comments">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-1">
                                                <img src={user.picturePath} alt="profile_img" className="icosty"/>
                                            </div>
                                            <div className="col-md-10">
                                                <input className="newcomment" type="text" name="comment" value={comment} placeholder="Write a comment..." onChange={handleComment}></input>
                                            </div>
                                            <div className="col-md-1">
                                                <i className="fa fa-paper-plane hand-hover" style={{color: "#12449b"}} aria-hidden="true" onClick={() => addComment(item.pid)}></i>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        {postComments[item.pid] && postComments[item.pid].map(comment => (
                                            <div className="container" key={comment.cid} style={{marginBottom: "10px"}}>
                                                <div className="row commentsty">
                                                    <div className="col-md-1">
                                                        <img src={comment.user.picturePath} alt="profile_img" className="icosty"/>
                                                    </div>
                                                    <div className="col-md-11">
                                                        {comment.text}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })
            ) : (
                "No posts data available"
            )}
        </div>
    )
}

export default Posts;
