import React, { useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Dashboard.css'
import Post from '../components/Post'

import buildingImg from '../assets/building.jpg'
import transport from '../assets/future.transportation.jpg'
import infra1 from '../assets/infrapic1.jpg'
import infra2 from '../assets/infraimg2.png'

import { supabase } from '../client'


function Dashboard() {

  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState('');
  const [isNewest, setIsNewest] = useState(false);
  const [isPopular, setIsPopular] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const {data} = await supabase
      .from('Posts')
      .select()
      .order('created_at', {ascending: true}) // organizes the posts from the most recently created

      setPosts(data);
      setAllPosts(data);
      console.log(data);
    };

    fetchPosts();
  }, [])

  const handleInput = (e) => {
    const value = e.target.value.toLowerCase();
    setInput(value);

    // filter posts based on input
    let filtered =  allPosts.filter((post) =>
        post.title.toLowerCase().includes(value)
    );

    // check if newest button filter pressed
    if (isNewest) {
      filtered = filtered.slice().reverse();
    }
    setPosts(filtered);
  }

  const handleOrder = () => {
    // ensures we can toggle between newest and oldest while respecting any active filter
    setIsNewest((prev) => {
      const newOrder = !prev;
      let filtered = allPosts.filter((post) =>
        post.title.toLowerCase().includes(input)
    );
    if(newOrder) filtered = filtered.slice().reverse();
    setPosts(filtered);
    return newOrder;

    })
  }

  const handleMostLikes = () => {
    setIsPopular((prev) => {
      const newPopular = !prev;
      let filtered = allPosts.filter((post) =>
      post.title.toLowerCase().includes(input)
      );
      if (isNewest) filtered = filtered.slice().reverse();
      if (newPopular) {
        filtered = filtered.slice().sort((a,b) => b.like_count - a.like_count);
      }

      setPosts(filtered);
      // set the state to its new value
      return newPopular;
    
  });
  }


  return (
    <>
    <div className='header-container'>
      <div className="header"> 
        <h1> 🏗️ Welcome to InfraHub! </h1>
      </div>
      <div className="image-panel"> 
                  <img src={buildingImg} alt="Glass Building"/>
                  <img src ={transport} alt="Bullet Train"/>
                  <img src={infra1} alt='Smart City'/>
                  <img src={infra2} alt='Industry'/>
      </div>
    </div>
    <div className="body-container">
        <div className="filters">
          <div className="text-filter">
            <h3> Filter by Title: </h3>
            <input type="text" value={input} placeholder="Search" onChange={handleInput}/>
          </div>
          <div className="filter-by-likes">
            <h3> Order by: </h3>
            <button className={`newest-filter ${isNewest ? 'active' : ''}`} onClick={handleOrder}> Newest </button>
            <button className={`likes-filter ${isPopular ? 'active': ''}`} onClick={handleMostLikes}> Most Popular </button>
          </div>
        </div>
        <div className="posts">
          { posts && posts.length > 0 ? 
                posts.map((post, index) => 
                  <Link to={`post-details/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Post 
                        title={post.title}  
                        topic={post.topic}
                        like_count={post.like_count}
                        timestamp={post.created_at}
                        username={post.username}
                    />
                  </Link>
                ) : <h2> No Posts Yet 😔 </h2>
            }
        </div>

    </div>

    </>
  )
}

export default Dashboard
