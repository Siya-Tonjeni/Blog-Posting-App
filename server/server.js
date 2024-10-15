
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const posts = []; // In-memory storage for posts

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.get('/', (req, res) => {
    res.redirect('/posts');
  });
  
  app.get('/posts', (req, res) => {
    res.json(posts);
  });

  app.get('/posts/:id', (req, res) => {
    const post = posts.find((post) => post.id === parseInt(req.params.id));
  
    if (post) {
      res.json(post);
    } else {
      res.status(404).send('Post not found');
    }
  });
  
  // app.post('/posts', (req, res) => {
  //   const newPost = {
  //     id: posts.length + 1,
  //     title: req.body.title,
  //     content: req.body.content,
  //   };
  //   posts.push(newPost);
  //   res.redirect('/posts');   
  //  // Redirect to the homepage after creating a post
  // });

  let nextId = 1;

  app.post('/posts', (req, res) => {
    const newPost = {
    id: nextId++,
    title: req.body.title,
    content: req.body.content,
    };
    posts.push(newPost);
    res.redirect('/posts');  
   });

app.put('/posts/:id', (req, res) => {
  const updatedPost = posts.find((post) => post.id === parseInt(req.params.id));
  const post = posts.find((post) => post.id === parseInt(req.params.id));
  console.log('Found post:', post);
  if (updatedPost) {
    updatedPost.title = req.body.title;
    updatedPost.content = req.body.content;
    res.json(updatedPost);
  } else {
    res.status(404).send('Post not found');
  }
});

// app.delete('/posts/:id', (req, res) => {
//   const index = posts.findIndex((post) => post.id === parseInt(req.params.id));
//   if (index !== -1) {
//     posts.splice(index, 1);
//     res.sendStatus(204);
//   } else {
//     res.status(404).send('Post not found');
//   }
// });

app.delete('/posts/:id', (req, res) => {
   const index = posts.findIndex((post) => post.id === parseInt(req.params.id));
   if (index !== -1) {
   posts.splice(index, 1);
      // Reset nextId to the highest existing ID + 1
   nextId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) + 1 : 1;
   res.sendStatus(204);
   } else {
   res.status(404).send('Post not found');
   }
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});