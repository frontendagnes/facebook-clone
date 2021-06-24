import React, { useState, useEffect } from 'react'
import './Feed.css'
import StoryReel from '../StoryReel/StoryReel'
import MessageSender from '../MessageSender/MessageSender'
import Post from '../Post/Post'
import db from '../utility/firebase'
import UploadImage from '../UploadImage/UploadImage'

function Feed() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        db.collection('posts')
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot => {
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            
        })
    }, [])

    return (
        <div className="feed">
            <StoryReel />
            <div>Dwie wersje sendera jedna </div>
            <MessageSender />
            <UploadImage  />
            {posts.map((post) => (
            <Post 
                id={post.id}
                postId={post.id}
                profilePic={post.data.profilePic}
                message={post.data.message}
                timestamp={post.data.timestamp}
                username={post.data.username}
                image={post.data.image}
                key={post.id}
                thumb={post.data.likes}
            />
            )
            )}
        </div>
    )
}

export default Feed
