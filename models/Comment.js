const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
    postOrigin: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
    textContent: String,
    deletedAt: {
      type: Date, 
      default: null
  }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;