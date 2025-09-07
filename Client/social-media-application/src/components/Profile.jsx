import React from "react";
import './Profile.css'

const Profile = ({user}) => {

    return(
        <div className="container subcont">
                <div className="row">
                <div className="col-md-2">
                <img src={user.picturePath} alt="profile_img" className="imgsty"/>
                </div>
                <div className="col-md-8">
                <div style={{marginTop: "20px"}}><b>{user.firstName+" "+user.lastName}</b></div>
                <div>0 friends</div>
                </div>
                <div className="col-md-2" style={{marginTop: "50px"}}><i className="fa fa-cog hand-hover" aria-hidden="true"></i></div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="boxtext d-flex flex-column align-items-start">
                    <div>
                      <i style={{marginLeft: "12px"}} className="fa fa-map-marker" aria-hidden="true"></i>
                      <span className="boxtext" style={{marginLeft: "10px"}}>{user.location}</span>
                    </div>
                    <div style={{marginTop: "5px"}}>
                      <i style={{marginLeft: "10px"}} className="fa fa-suitcase" aria-hidden="true"></i>
                      <span className="boxtext" style={{marginLeft: "8px"}}>{user.occupation}</span>
                    </div>
                  </div>
                </div>
                <hr></hr>
                <div className="row">
                  <div className="boxtext">Who viewed your profile:<b>{" "+user.viewedProfile}</b><br></br>Impressions of your post:<b>{" "+user.impressions}</b></div>
                </div>
                <hr></hr>
                <div style={{paddingLeft: "5px"}}><b>Social Profiles</b></div>
                <div className="row">
                  <div className="col-md-1"><img src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-twitter-social-media-round-icon-png-image_6315985.png" className="icosty" alt="twitter"></img></div>
                  <div className="col-md-9">
                  <div className="row boxtext">Twitter</div><div className="row boxtext">Social Network</div>
                  </div>
                  <div className="col-2"><i className="fa fa-pen hand-hover" aria-hidden="true"></i></div>
                </div>
                <div className="row">
                  <div className="col-md-1"><img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png" className="icosty" alt="linkedin"></img></div>
                  <div className="col-md-9">
                  <div className="row boxtext">LinkedIn</div><div className="row boxtext">Social Network</div>
                  </div>
                  <div className="col-2"><i className="fa fa-pen hand-hover" aria-hidden="true"></i></div>
                </div>
              </div>
    );
};

export default Profile;