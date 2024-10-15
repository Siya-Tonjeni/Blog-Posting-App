// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// function HomePage() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/posts');
//         setPosts(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <div>
//       <h1>Blog Posts</h1>
//       <ul>
//         {posts.map((post, index) => (
//           <li key={index}>
//             <Link to={`/view/${index}`}>{post.title}</Link>
//           </li>
//         ))}
//       </ul>
//       <Link to="/create">Create New Post</Link>
//     </div>
//   );
// }

// export default HomePage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/view/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/create">Create New Post</Link>
    </div>
  );
}

export default HomePage;
