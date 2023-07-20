import React, { useState } from "react";
import './Posts.css';

const Posts = ({user,posts}) => {
    const [commentVisibility, setCommentVisibility] = useState([]);
    const [likeVisibility, setlikeVisibility] = useState([]);
    const [comment,setComment] = useState([]);
    const [postComments, setPostcomments] = useState([]);

    const handleComment = (e) => {
      setComment(e.target.value);
    }

    const addComment = async(pid) => {
      const formData = new FormData();
      formData.append('text', comment);
      formData.append('pid', pid);
      formData.append('uid', user.uid);

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

    const addFriend = async() => {
      // const formData = new FormData(); // Create a new FormData object
  
      // formData.append('uid', user.uid);
      // formData.append('friendId', posts.user.uid);

      // const jsonObject = {};
      // formData.forEach((value, key) => {
      //   jsonObject[key] = value;
      // });

      // fetch('http://localhost:8080/friends', {
      //   method: "POST",
      //   body: JSON.stringify(jsonObject),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log("Response from backend:", data);
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //   });
    }

    const handleButton = async (index, pid) => {
      const newVisibility = [...commentVisibility];
      newVisibility[index] = !newVisibility[index];
      setCommentVisibility(newVisibility);
    
      const response = await fetch(`http://localhost:8080/comment/${pid}`);
      const data = await response.json();
      const fetchedComments = data;
    
      // Update the postComments array using pid as index
      setPostcomments((prevComments) => {
        const updatedComments = [...prevComments];
        updatedComments[pid] = fetchedComments;
        return updatedComments;
      });
    }
    

    const handleLike = (index) => {
      const newVisibility = [...likeVisibility];
      newVisibility[index] = !newVisibility[index];
      setlikeVisibility(newVisibility);
    }

    return(
        <div>
            {Array.isArray(posts) ? (
                posts.map((item, index) => {
                return(
                  <><div key={index} className="container postsubcont">
                    <div className="row">
                      <div className="col-md-1">
                        <img src={user.picturePath} alt="profile_img" className="imgsty" />
                      </div>
                      <div className="col-md-9">
                        <div className="boxtext" style={{ marginTop: "20px" }}>{user.firstName} {user.lastName}</div>
                        <div className="boxtext">{user.location}</div>
                      </div>
                      <div className="col-md-2">
                        <div className="hand-hover"><i className="fa fa-user-friends" aria-hidden="true" onClick={addFriend}></i></div>
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
                        <button className={`hand-hover like-button ${likeVisibility[index] ? 'liked' : ''}`} onClick={() => handleLike(index)}><i style={{ marginRight: "8px"}} className="fa fa-thumbs-up" aria-hidden="true"></i>Like</button>
                        <button className={`hand-hover like-button ${commentVisibility[index] ? 'liked' : ''}`} onClick={() => handleButton(index,item.pid)}><i style={{ marginRight: "8px" }} className="fa fa-comment" aria-hidden="true"></i>Comment</button>
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
                          <div className="container" key={comment.id} style={{marginBottom: "10px"}}>
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
                  </div></>
                )})
              ) : (
                "No posts data available"
              )}
        </div>
    )
}

export default Posts;