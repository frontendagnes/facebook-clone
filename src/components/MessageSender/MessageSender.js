import React, { useState } from "react";
import "./MessageSender.css";
import { useStateValue } from "../utility/StateProvider";
import db, { addDoc, serverTimestamp, collection } from "../utility/firebase";
//mui
import AddCommentIcon from "@mui/icons-material/AddComment";
import Avatar from "@mui/material/Avatar";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import MoodIcon from "@mui/icons-material/Mood";
//component
import UploadImage from "../UploadImage/UploadImage";

function MessageSender() {
  const [input, setInput] = useState("");
  const [imageURL, setImageUrl] = useState("");
  const [isUpload, setIsUpload] = useState(false);

  const [{ user }] = useStateValue();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ref = collection(db, "posts");
    await addDoc(ref, {
      message: input,
      timestamp: serverTimestamp(),
      profilePic: user.photoURL,
      username: user.displayName,
      image: imageURL,
      likes: [],
    })
      .then(() => {
        console.log("Dodano post");
        setInput("");
        setImageUrl("");
      })
      .catch((error) => console.error("Post error>>", error.message));
  };

  const handleClick = () => {
    setIsUpload(!isUpload);
  };

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar src={user.photoURL} />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="massegeSender__input"
            placeholder={`What's on your mind, ${user.displayName}?`}
          />
          {!isUpload ? (
            <input
              value={imageURL}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder={`Image URL (Optional)`}
            />
          ) : null}
          <button onClick={handleSubmit} type="submit">
            Hidden button
          </button>
          {!isUpload ? (
            <AddCommentIcon
              onClick={handleSubmit}
              fontSize="large"
              sx={{ color: "#1877f2" }}
            />
          ) : null}
        </form>
      </div>
      <div className="messageSender__bottom">
        <div className="messageSander__option">
          <VideocamIcon style={{ color: "red" }} />
          <h3>Live Video</h3>
        </div>
        <div className="messageSander__option" onClick={handleClick}>
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>Photo/Video (it work)</h3>
        </div>
        <div className="messageSander__option">
          <MoodIcon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
        </div>
      </div>
      {isUpload ? (
        <UploadImage
          input={input}
          setInput={setInput}
          setIsUpload={setIsUpload}
        />
      ) : null}
    </div>
  );
}

export default MessageSender;
