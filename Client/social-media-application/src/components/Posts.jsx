import React from "react";
import './Posts.css'

const Posts = ({user,posts}) => {
    const addFriend = async() => {
      const formData = new FormData(); // Create a new FormData object
  
      formData.append('uid', user.uid);
      formData.append('friendId', posts.user.uid);

      const jsonObject = {};
      formData.forEach((value, key) => {
        jsonObject[key] = value;
      });

      fetch('http://localhost:8080/friends', {
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
    }

    return(
        <div>
            {Array.isArray(posts) ? (
                posts.map((item, index) => {
                console.log(item);
                return(
                  <div key={index} className="container subcont">
                    <div className="row">
                      <div className="col-md-1">
                        <img src={user.picturePath} alt="profile_img" className="imgsty" />
                      </div>
                      <div className="col-md-9">
                        <div className="boxtext" style={{ marginTop: "20px" }}>{user.firstName} {user.lastName}</div>
                        <div className="boxtext">{user.location}</div>
                      </div>
                      <div className="col-md-2">
                        <div><i className="fa fa-user-friends" aria-hidden="true" onClick={addFriend}></i></div>
                      </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                      <div className="boxtext col">
                        <div>{item.description}</div>
                        <img style={{ width: "100%", marginTop: "10px" }} src={window.location.origin+item.picturePath} alt="post_img" className="postimg" />
                      </div>
                    </div>
                    <hr></hr>
                    <div>
                      <div className="row boxtext justify-content-around" style={{ paddingBottom: "15px" }}>
                        <div><i style={{ marginRight: "8px" }} className="fa fa-thumbs-up" aria-hidden="true"></i>Like</div>
                        <div><i style={{ marginRight: "8px" }} className="fa fa-comment" aria-hidden="true"></i>Comment</div>
                      </div>
                    </div>
                  </div>
                )})
              ) : (
                "No posts data available"
              )}
        </div>
    )
}

export default Posts;