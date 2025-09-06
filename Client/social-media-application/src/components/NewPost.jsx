import React from "react";
import './NewPost.css';
import {useState} from "react";

const NewPost = ({uid}) => {
    const [imgUrl, setImgurl] = useState("");
    const [showImageUpload, setShowImageUpload] = useState(false);
    const [desc,setDesc] = useState("");

    const handlebuttonclick = (e) => {
      e.preventDefault();
      setShowImageUpload(!showImageUpload);
    }

    const handleChange = (e) => {
      setDesc(e.target.value);
    };
  

    const handleImage = async (e) => {
      const jwt = localStorage.getItem("jwt");
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('http://localhost:8080/upload/to', {
        method: 'POST',
        body: formData,
        headers: {
          "Authorization": `Bearer ${jwt}`,
        },
      });
    
      if (response.ok) {
        // Extract the uploaded image URL from the response
        const imageUrl = await response.text();
        setImgurl(imageUrl);
        formData.set('imageUrl', imageUrl);
      } else {
        // Handle error when file upload fails
        console.log('File upload failed');
      }
    };
        const addPost = (event) => {
      const jwt = localStorage.getItem("jwt");
      const userId = localStorage.getItem("userId");
      
      const formData = new FormData(); // Create a new FormData object
  
      formData.append('userid', userId);
      formData.append('description', desc);
      formData.append('picturePath', imgUrl);

      const jsonObject = {};
      formData.forEach((value, key) => {
        jsonObject[key] = value;
      });

      console.log(jsonObject);
  
      fetch('http://localhost:8080/post/add-post', {
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
  
      // console.log(JSON.stringify(formData));
      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      formData.delete('userid');
      formData.delete('description');
      formData.delete('imageUrl');

      window.location.reload();
    };


    return(
        <div>
            <div className="container npsubcont">
                <form onSubmit={addPost}>
                <div className="row">
                <div className="col-md-1">
                <img src="https://pyxis.nymag.com/v1/imgs/bca/465/a386aa2ea7d13400dd69b6237ad1407f53-01-tom-cruise.rhorizontal.w700.jpg" alt="profile_img" className="imgsty" />
                </div>
                <div className="col-md-11">
                <input type="text" name="description" value={desc} placeholder="What's on your mind..." onChange={handleChange} style={{marginTop: "25px",width: "100%",height: "50px"}}></input>
                </div>
                </div>
                <hr></hr>
                <div className="row boxtext justify-content-between" style={{marginRight: "25px",paddingBottom: "10px"}}>
                  <button className="newpostbtn hand-hover" onClick={handlebuttonclick}><i style={{marginRight: "8px"}} className="fa fa-image" aria-hidden="true"></i>Image</button>
                  <button className="newpostbtn hand-hover" onClick={handlebuttonclick}><i style={{marginRight: "8px"}} className="fa fa-video" aria-hidden="true"></i>Clip</button>
                  <button className="newpostbtn hand-hover" onClick={handlebuttonclick}><i style={{marginRight: "8px"}} className="fa fa-paperclip" aria-hidden="true"></i>Attachment</button>
                  <button className="newpostbtn hand-hover" onClick={handlebuttonclick}><i style={{marginRight: "8px"}} className="fa fa-microphone" aria-hidden="true"></i>Audio</button>
                </div>
                {showImageUpload && (<div>
                <><input
                type="file"
                name="image"
                onChange={handleImage}/></>
                </div>)}
                <div className="row boxtext justify-content-end" style={{marginRight: "0px",paddingBottom: "8px",marginTop: "5px"}}>
                  <button type="submit" className="btn btn-success">Post</button>
                </div>
                </form>
              </div>
        </div>
    )
}

export default NewPost;