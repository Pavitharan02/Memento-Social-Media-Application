import React from "react";
import './Posts.css'

const Posts = ({user,posts}) => {
    return(
        <div>
            {Array.isArray(posts) ? (
                posts.map((item, index) => (
                  <div key={index} className="container subcont">
                    <div className="row">
                      <div className="col-md-1">
                        <img src="https://pyxis.nymag.com/v1/imgs/bca/465/a386aa2ea7d13400dd69b6237ad1407f53-01-tom-cruise.rhorizontal.w700.jpg" alt="profile_img" className="imgsty" />
                      </div>
                      <div className="col-md-9">
                        <div className="boxtext" style={{ marginTop: "20px" }}>{user.firstName} {user.lastName}</div>
                        <div className="boxtext">{user.location}</div>
                      </div>
                      <div className="col-md-2">
                        <div><i className="fa fa-user-friends" aria-hidden="true"></i></div>
                      </div>
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
                      <div className="row boxtext justify-content-around" style={{ paddingBottom: "15px" }}>
                        <div><i style={{ marginRight: "8px" }} className="fa fa-thumbs-up" aria-hidden="true"></i>Like</div>
                        <div><i style={{ marginRight: "8px" }} className="fa fa-comment" aria-hidden="true"></i>Comment</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                "No posts data available"
              )}
        </div>
    )
}

export default Posts;