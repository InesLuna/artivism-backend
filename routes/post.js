const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bodyParser = require('body-parser');
const User = require("../models/User");
const Post = require("../models/Post");

// HELPER FUNCTIONS

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin
} = require("../helpers/authMiddlewares");

// GET '/'
router.get('/', async (req, res, next) => {
    const postsList = await Post.find()
    res.json(postsList);
});

// GET '/:id'
router.get('/:id', isLoggedIn(), async (req, res, next) => {
    const postId = req.params.id
    const postDetail = await Post.findById(postId)
    res.json(postDetail);
});

//  POST    '/create'

router.post("/create", isLoggedIn(), async (req, res, next) => {
    const { theme, city, country, images, makeThisHappend, textContent } = req.body;
    const user = req.session.currentUser
    try {
        const newPost = await Post.create({ author: user._id, theme, city, country, images, makeThisHappend, textContent });
        res
          .status(200) //  OK
          .json(newPost);
      
    } catch (error) {
      next(error);
    }
  }
);

//  PUT    '/edit'

router.put('/:id/edit', isLoggedIn(), async (req, res, next) => {
    const postId = req.params.id;
    const { theme, city, country, images, makeThisHappend, textContent } = req.body;

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
