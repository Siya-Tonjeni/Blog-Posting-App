import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${id}`);
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:3001/posts/${id}`, {
        title,
        content,
      });
      console.log('Post updated successfully');
      navigate('/'); // Redirect to the homepage
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Post</h2>
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
        <button type="submit">Update</button>
        <button onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
}

export default EditPostPage;