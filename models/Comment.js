const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
        type: ObjectId,
        ref: 'User'
      },
    postOrigin: {
        type: ObjectId,
        ref: 'User'
      },
    textContent: String,
    deletedAt: null
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;