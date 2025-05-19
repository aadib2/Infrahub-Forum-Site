import React from 'react'
import {useState, useEffect} from 'react'
import {useParams} from  'react-router-dom'
import { supabase } from '../client'
import './EditPost.css'

const EditPost = () => {
    const {id} = useParams();
    const [post, setPost] = useState({title: "", topic: "", content: "", img_url:"", like_count: 0});

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
        
                fetchPost();
        }, [id])

    const handleChange = (event) => {
        const {name, value} = event.target;
       // console.log(`Updating ${name} to ${value}`); // Debugging: Log the field being updated
        setPost( (prev) => (
            {
                ...prev,
                [name]:value,
            }));
       //console.log(post);
    };

    const updatePost = async (event) => {
        event.preventDefault();

        try {
            await supabase
                .from("Posts")
                .update({title: post.title, topic: post.topic, content: post.content, img_url: post.img_url})
                .eq('id', id);
        } catch(error) {
            console.log(error);
            return;
        }       
        console.log('Data updated successfully')
        window.location = '/dashboard'; // redirect to home page
    }

    return (
        <div>
            <h1> Edit an Existing Post </h1>
            <div className="input-form">
            <form>
                <label htmlFor="title"> Title: </label> <br/>
                <input type="text" id="title" name="title" value={post.title}onChange={handleChange}/> 
                <br/>

                <label htmlFor="topic">Topic Area: </label><br />
                <input type="text" id="topic" name="topic" value={post.topic} onChange={handleChange} /><br />
                <br/>

                <label for="content"> Content: </label><br />
                <textarea rows="5" cols="50" id="content" name="content" value={post.content} onChange={handleChange}>
                </textarea>
                <br/>

                <label htmlFor="img_url">Image: </label><br />
                <input type="text" id="img_url" name="img_url" value={post.img_url} onChange={handleChange} /> <br />
                <br/>
                <br/>

                <div className="updateButton">
                    <input type="submit" value="Update Post!" onClick={updatePost} />
                </div>
            </form>

        </div>
        </div>
    )
}

export default EditPost;