const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
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
    userImage: {
        type: Array,  
        required: true
        },
    makeThisHappend: String,
    textContent: String,
    notifications: {
        type: Number,  
        default: 0
        },
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

const Post = mongoose.model('Post', postSchema);

module.exports = Post;