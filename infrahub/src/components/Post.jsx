import React, {useState, useEffect} from 'react'
import { supabase } from '../client'
import './Post.css'

const Post = ({title, topic, like_count, timestamp, username}) => {
    const [creationTime, setCreationTime] = useState('')

    
    

    useEffect(() => {
        const getTimeAgo = () => {
            const postDate = new Date(timestamp);
            const now = new Date();
            const secondsAgo = Math.floor((now-postDate) / 1000);

            // check how much time has passed, and set creation time
            if (secondsAgo < 60) 
                return `${secondsAgo} seconds ago`;
            const minutesAgo = Math.floor(secondsAgo / 60);
            if (minutesAgo < 60) 
                return `${minutesAgo} minutes ago`;
            const hoursAgo = Math.floor(minutesAgo / 60);
            if (hoursAgo < 24) 
                return `${hoursAgo} hours ago`;
            const daysAgo = Math.floor(hoursAgo / 24);
            return `${daysAgo} days ago`;
        }
        setCreationTime(getTimeAgo());

    }, []);

    
    return (
        <>
            <div className="card">
                <p> {creationTime} by {username} </p>
                <h2> {title} </h2>
                <h4> Topic Area: {topic} </h4>
                <p> {like_count} upvotes </p>
            </div>
        </>

    )
}

export default Post;