import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import './index.css'


// pages for user auth
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Wrapper from './pages/Wrapper.jsx'

// pages for forum site
import Dashboard from './pages/Dashboard.jsx'
import Navbar from './components/Navbar.jsx'
import CreatePost from './pages/CreatePost.jsx'
import AboutPage from './pages/AboutPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import DetailsPage from './pages/DetailsPage.jsx'
import EditPost from './pages/EditPost.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* protected dashboard and children */}
        <Route
          path="/dashboard"
          element={
            <Wrapper>
              <Navbar />
            </Wrapper>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="post-details/:id" element={<DetailsPage />} />
          <Route path="edit/:id" element={<EditPost />} />
           
        </Route>
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
