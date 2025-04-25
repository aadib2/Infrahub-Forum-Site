import React from 'react'
import {supabase} from '../client.js'
import {useState} from 'react'
import './CreatePost.css'


const CreatePost = () => {
    const [post, setPost] = useState({title: "", topic: "", content: "", img_url:"", like_count: 0})

    // event handler to update and set the post state
    const handleChange = (event) => {
        const {name, value} = event.target;
       // console.log(`Updating ${name} to ${value}`); // Debugging: Log the field being updated
        setPost( (prev) => (
            {
                ...prev,
                [name]:value,
            }));
       console.log(post);
    };

    // add post to db
    const createPost = async (event) => {
        event.preventDefault();
       try {
        await supabase
            .from('Posts')
            .insert({title: post.title, topic: post.topic, content: post.content, img_url: post.img_url})
            .select();

       } catch(error) {
            console.log(error);
            return;
       }       
       console.log('Data inserted successfully')
       window.location = '/'; // redirect to home page
    }

    // potential method to validate img urls


    return (
    <div>
        <div className="header">
            <h1> 👷‍♂️ Create a Post here! 🛠️</h1>
        </div>
        <div className="input-form">
            <form>
                <label htmlFor="title"> Title: </label> <br/>
                <input type="text" id="title" name="title" placeholder='Enter title here' onChange={handleChange}/> 
                <br/>

                <label htmlFor="topic">Topic Area: </label><br />
                <input type="text" id="topic" name="topic" placeholder="e.g. Smart Cities, Bridges"onChange={handleChange} /><br />
                <br/>

                <label for="content"> Content: </label><br />
                <textarea rows="5" cols="50" id="content" name="content" placeholder='Type your post content here!'onChange={handleChange}>
                </textarea>
                <br/>

                <label htmlFor="img_url">Image: </label><br />
                <input type="text" id="img_url" name="img_url" placeholder='Image URL (optional)' onChange={handleChange} /> <br />
                <br/>
                <br/>

                <div className="submitButton">
                    <input type="submit" value="Create Post!" onClick={createPost} />
                </div>
            </form>

        </div>

    </div>
    )
}


export default CreatePost;