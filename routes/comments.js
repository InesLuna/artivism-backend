const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bodyParser = require('body-parser');
const Comment = require("../models/Comment");
const Post = require("../models/Post");

// HELPER FUNCTIONS

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin
} = require("../helpers/authMiddlewares");

// GET '/:id/comments'
router.get('/:postId/comments', isLoggedIn(), async (req, res, next) => {
    const {postId} = req.params
    const commentsList = await Comment.find({postOrigin: postId})
    res.json(commentsList);
});

//  POST    '/:id/create'

router.post("/:postId/create", isLoggedIn(), async (req, res, next) => {
    const { textContent } = req.body;
    const user = req.session.currentUser
    const {postId} = req.params
    try {
        const newComment = await Comment.create({ author: user._id, postOrigin: postId, textContent });
        res
          .status(200) //  OK
          .json(newComment);
      
    } catch (error) {
      next(error);
    }
  }
);

//  PUT    '/:id/comment/:id/edit'

router.put('/:postId/comment/:commentId/edit', isLoggedIn(), async (req, res, next) => {
    console.log(req.params)
    const  {commentId} = req.params;
    const { textContent } = req.body;
    const newComment = { textContent }
    const commentUpdated = await Comment.findByIdAndUpdate(commentId, newComment,{new:true})
    
    res.json(commentUpdated);
    return; 
  });

//DELETE '/delete'

router.delete('/comment/:id/delete', isLoggedIn(), async (req, res, next) => {
    const commentId = req.params.id;
  
    const commentDelete = await Comment.findByIdAndDelete(commentId)
    res
      .status(204)  //  No Content
      .send();
    return; 
  });

module.exports = router;
