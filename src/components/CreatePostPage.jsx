import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/posts', {
        title,
        content,
      });
      console.log('Post created successfully:', response.data);
      navigate('/'); // Redirect to the homepage
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}   

        />
        <br />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <button   
 type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePostPage;