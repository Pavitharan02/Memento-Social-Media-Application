import React from "react";
import './NewPost.css'

const NewPost = () => {

    return(
        <div>
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
                <div className="row boxtext justify-content-end" style={{marginRight: "0px",paddingBottom: "8px",marginTop: "5px"}}>
                  <button type="button" className="btn btn-success">Post</button>
                </div>
              </div>
        </div>
    )
}

export default NewPost;