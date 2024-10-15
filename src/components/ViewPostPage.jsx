import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ViewPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);
  

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/posts/${id}`);
      console.log('Post deleted successfully');
      navigate('/'); // Redirect to the homepage
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = () => {
    // Navigate to the edit page, passing the post ID as a parameter
    navigate(`/edit/${id}`);
  };
  if (error) {
    return <div>Error fetching post: {error.message}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}

export default ViewPostPage;