const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: ObjectId,
        ref: 'User'
      },
    theme: {
        type: String,  
        required: true
        },
    city: {
        type: String,  
        required: true
        },
    country: {
        type: String,  
        required: true
        },
    images: {
        type: Array,  
        required: true
        },
    makeThisHappend: String,
    textContent: String,
    notifications: {
        type: Number,  
        default: 0
        },
    deletedAt: null
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;