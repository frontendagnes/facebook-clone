import React, { useState, useEffect } from "react";
import "./Feed.css";
import db, {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "../utility/firebase";
//mui
import StoryReel from "../StoryReel/StoryReel";
import MessageSender from "../MessageSender/MessageSender";
import Post from "../Post/Post";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const ref = collection(db, "posts");
    const sortRef = query(ref, orderBy("timestamp", "desc"));
    const unsuscribe = onSnapshot(sortRef, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => {
      unsuscribe();
    };
  }, []);

  return (
    <div className="feed">
      <StoryReel />
      <MessageSender />
      {posts.map((post) => (
        <Post
          key={post.id}
          postId={post.id}
          profilePic={post.data.profilePic}
          message={post.data.message}
          timestamp={post.data.timestamp}
          username={post.data.username}
          image={post.data.image}
          thumb={post.data.likes}
        />
      ))}
    </div>
  );
}

export default Feed;
