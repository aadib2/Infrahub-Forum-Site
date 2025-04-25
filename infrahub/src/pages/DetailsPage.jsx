import React from 'react'
import './DetailsPage.css'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../client'


const DetailsPage = () => {
    const {id} = useParams();

    const [post, setPost] = useState({id: null, created_at: null, title: "", topic: "", content: "", img_url: "", like_count: ""})
    const [creationTime, setCreationTime] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    // fetch the post with the given id
    
    const getTimeAgo = () => {
            const postDate = new Date(post.created_at);
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


    useEffect(() => {
            const fetchPost = async () => {
                const {data, error} = await supabase
                    .from('Posts')
                    .select()
                    .eq('id', id)
                    .single(); //fetch a single post by ID
                
                if(error) {
                    console.error("Could not fetch post, error:", error);
                } else {
                    setPost(data);
                }
            };

            const fetchComments = async () => {
                const { data, error } = await supabase
                .from('Comments')
                .select()
                .eq('post_id', id)
                .order('created_at', { ascending: true });
                if (!error) setComments(data);
            };    
            fetchPost();
            setCreationTime(getTimeAgo());
            if (id) fetchComments();
    }, [id])

    const updateLikeCount = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .update({like_count: post.like_count+1})
            .eq('id', id)
        
        setPost(prev => ({
        ...prev,
        like_count: prev.like_count + 1
        }));
    }

    const deletePost = async (event) => {
        event.preventDefault();

        try {
            await supabase
                .from('Posts')
                .delete()
                .eq('id', id)
        } catch(error) {
            console.log(error);
            return;
        }
        console.log("Post deleted successfully")
        window.location = '/';
    }

    const createComment = async (e) => {
            e.preventDefault();
            if (!newComment.trim()) return;
            const { data, error } = await supabase
                .from('Comments')
                .insert([{ post_id: id, content: newComment }]);
            
            setNewComment("");
    }
    
    


    return (
        <div className="details-container">
            <div className="details-header">
                <p className="timestamp"> {post.created_at ? getTimeAgo() : ""} </p>
                <div className="icons">
                    <Link to={`/edit/${id}`} key={id}> ✏️ </Link>
                    <button className="delete-button" onClick={deletePost}> 🗑️ </button>
                </div>
            </div>
            <h2> {post.title} </h2>
            <h2> Topic Area: {post.topic} </h2>
            <p> {post.content} </p>
            {post.img_url === "" ?  <p> No Image Provided</p>: (<img src={post.img_url} alt="post-image"/>)}
            <button className="like-button" onClick={updateLikeCount}> ❤️ {post.like_count} upvotes </button>
            
            
            <div className="comments-container">
                <h3> Comments: </h3>
                {/* display the current comments*/}
                {comments.length === 0 && <p>No comments yet.</p>}
                <ul>
                    {comments.map(comment => (
                <li key={comment.id}>
                    <span>{comment.content}</span>
                    <span style={{ color: "#888", marginLeft: 8, fontSize: "0.9em" }}>
                        {new Date(comment.created_at).toLocaleString()}
                    </span>
                 </li>
                ))}
                </ul>

                {/* have the input form at the end */}
                <form>
                    <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} 
                    placeholder="Add a comment..."
                    />

                    <button type="submit" onClick={createComment}> Post </button>

                </form>
            </div>
        </div>

    )
}

export default DetailsPage;
