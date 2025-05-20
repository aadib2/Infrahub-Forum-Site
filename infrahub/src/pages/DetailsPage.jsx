import React from 'react'
import './DetailsPage.css'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../client'

import DeleteModal from '../components/DeleteModal'


const DetailsPage = () => {
    const {id} = useParams();
    const [isVisible, setIsVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [post, setPost] = useState({id: null, created_at: null, title: "", topic: "", content: "", img_url: "", like_count: ""})
    const [creationTime, setCreationTime] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const [displayName, setDisplayName] = useState("");
    const [userID, setUserID] = useState("");
    
    
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
                if (!error) 
                    setComments(data);
            };

            const getUserInfo = async () => {
                const { data, error } = await supabase.auth.getUser();
                
                if(data && data.user && data.user.user_metadata) {
                    console.log(data.user.user_metadata.display_name)
                    setDisplayName(data.user.user_metadata.display_name);
                    setUserID(data.user.id);
    
                }
    
                if(error) {
                    console.log(error.message);
                }
            }
    
            getUserInfo();
    
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

    const createComment = async (event) => {
            event.preventDefault();
            if (!newComment.trim()) return;
            const { data, error } = await supabase
                .from('Comments')
                .insert([{ post_id: id, content: newComment, username: displayName, user_id: userID}]);
            
            setNewComment("");
            window.location = `/dashboard/post-details/${id}`
    }

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    
    return (
        <>
        <div className="details-container">
            <div className="details-header">
                <p className="timestamp"> {post.created_at ? `${getTimeAgo()} by ${post.username}` : ""} </p>
                <div className="icons">
                    <Link to={`/dashboard/edit/${id}`} key={id}> ✏️ </Link>
                    {/* create a popup for the delete button */}
                    <button className="delete-button" onClick={() => setShowModal(true)}> 🗑️ </button>
                     {showModal && <DeleteModal postid={id} onClose={()=> setShowModal(false)} />}
                </div>
            </div>

            <h2> {post.title} </h2>
            <h2> Topic Area: {post.topic} </h2>
            <p> {post.content} </p>
            {post.img_url === "" ?  <p> No Image Provided</p>: (<img src={post.img_url} alt="post-image"/>)}

            <div className="button-container">
                <button className="like-button" onClick={updateLikeCount}> ❤️ {post.like_count} upvotes </button>
                <button className="comments-button" onClick={toggleVisibility}> 💬 </button>
            </div>

            
            {isVisible && 
            <div className="comments-container">
                <h3> Comments: </h3>
                <div className="comments-list">
                {comments.length === 0 && <p>No comments yet.</p>}
                {comments.map(comment => (
                    <div className="comment-card" key={comment.post_id}>
                        <span>{comment.content}</span>
                        <span className="comment-date">
                            {new Date(comment.created_at).toLocaleString()} {comment.username ? `(${comment.username})` : ""}
                        </span>
                    </div>
                ))}
                </div>

                {/* have the input form at the end */}
                <form className="comment-form">
                    <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} 
                    placeholder="Add a comment..."
                    />

                    <button type="submit" className="post-comment-button" onClick={createComment}> Post </button>

                </form>
            </div> }
        </div>
    
    </>

    )
}

export default DetailsPage;
