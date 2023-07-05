import React from "react";
import './NewPost.css';
import {useState} from "react";

const NewPost = ({uid}) => {
    const [imageFile, setImageFile] = useState("null");
    const [formData, setFormData] = useState({
      user_id: uid,
      description: "",
      pic_path: "",
    });

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      setImageFile(file);
    };

    const addpost = (event) => {
      event.preventDefault();

      const formObj = new FormData();
      formObj.user_id = uid;
      formObj.description = formData.description;
      formObj.pic_path = imageFile.name;

      // fetch(API_URL, {
      //   method: "POST",
      //   body: JSON.stringify(formObj),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     // Handle response from the backend
      //     console.log("Response from backend:", data);
      //   })
      //   .catch((error) => {
      //     // Handle error
      //     console.error("Error:", error);
      //   });

      console.log(formObj);

      setFormData({
        user_id: uid,
        description: "",
        pic_path: "",
      })
    };

    return(
        <div>
            <div className="container subcont">
                <form onSubmit={addpost}>
                <div className="row">
                <div className="col-md-1">
                <img src="https://pyxis.nymag.com/v1/imgs/bca/465/a386aa2ea7d13400dd69b6237ad1407f53-01-tom-cruise.rhorizontal.w700.jpg" alt="profile_img" className="imgsty" />
                </div>
                <div className="col-md-11">
                <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="What's on your mind..." style={{marginTop: "25px",width: "100%",height: "50px"}}></input>
                </div>
                </div>
                <hr></hr>
                <div className="row boxtext justify-content-between" style={{marginRight: "25px",paddingBottom: "10px"}}>
                  <div><i style={{marginRight: "8px"}} className="fa fa-image" aria-hidden="true"></i>Image</div>
                  <div><i style={{marginRight: "8px"}} className="fa fa-video" aria-hidden="true"></i>Clip</div>
                  <div><i style={{marginRight: "8px"}} className="fa fa-paperclip" aria-hidden="true"></i>Attachment</div>
                  <div><i style={{marginRight: "8px"}} className="fa fa-microphone" aria-hidden="true"></i>Audio</div>
                </div>
                <div>
                <input
                  type="file"
                  id="imageUpload"
                  onChange={handleImageUpload}
                />
                </div>
                <div className="row boxtext justify-content-end" style={{marginRight: "0px",paddingBottom: "8px",marginTop: "5px"}}>
                  <button type="submit" className="btn btn-success">Post</button>
                </div>
                </form>
              </div>
        </div>
    )
}

export default NewPost;