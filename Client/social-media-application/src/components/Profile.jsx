import React from "react";
import './Profile.css'

const Profile = ({user}) => {

    return(
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
    );
};

export default Profile;