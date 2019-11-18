const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bodyParser = require('body-parser');
const User = require("../models/User");
const Post = require("../models/Post");

//cloudinary setup
const uploadCloud = require('../configs/cloudinary-setup.js')

// HELPER FUNCTIONS

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin
} = require("../helpers/authMiddlewares");

// GET '/'
router.get('/', async (req, res, next) => {
    const postsList = await Post.find().populate('author')
    res.json(postsList);
});

// GET user posts '/'
router.get('/user/posts',isLoggedIn(), async (req, res, next) => {
  const userId = req.session.currentUser._id
  const postsList = await Post.find({author: userId})
  res.json(postsList);
});

// GET '/:id'
router.get('/:id', isLoggedIn(), async (req, res, next) => {
    const postId = req.params.id
    const postDetail = await Post.findById(postId).populate('author')
    res.json(postDetail);
});

//  POST    '/create'

router.post("/create", isLoggedIn(), async (req, res, next) => {
    const { theme, city, country, makeThisHappend, textContent, userImage } = req.body;
    const user = req.session.currentUser
    console.log(userImage)
    try {
        //montar post
        const newPostDetails = {
            author: user._id,
            theme,
            city,
            country,
            makeThisHappend,
            textContent,
            userImage
        }

        const newPost = await Post.create(newPostDetails);
        res
          .status(200) //  OK
          .json(newPost);
      
    } catch (error) {
      next(error);
    }
  }
);

//  PUT    '/edit'

router.put('/:id/edit', isLoggedIn(),uploadCloud.single('images'), async (req, res, next) => {
    const postId = req.params.id;
    const { theme, city, country, makeThisHappend, textContent } = req.body;
    const images = req.file.url

    const newPost = { theme, city, country, images, makeThisHappend, textContent }

    const postUpdated = await Post.findByIdAndUpdate(postId, newPost,{new:true})
    
    res.json(postUpdated);
    return; 
  });

//DELETE '/delete'

router.delete('/:id/delete', isLoggedIn(), async (req, res, next) => {
    const postId = req.params.id;
  
    const postDelete = await Post.findByIdAndDelete(postId)
    res
      .status(204)  //  No Content
      .send();
    return; 
  });

  module.exports = router;
