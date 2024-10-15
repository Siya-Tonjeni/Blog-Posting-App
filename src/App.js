import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreatePostPage from './components/CreatePostPage';
import ViewPostPage from './components/ViewPostPage';
import EditPostPage from './components/EditPostPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route path="/view/:id" element={<ViewPostPage />} />
        <Route path="/edit/:id" element={<EditPostPage />} />
      </Routes>
    </Router>
  );
}

export default App;