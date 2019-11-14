const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, 
        unique: true, 
        required: true
        },
    aboutMe: String,
    email: {
        type: String, 
        unique: true, 
        required: true
        },
    password: {
        type: String, 
        min:6 , 
        required: true
        },
    userImage: String,
    favorites: Array,
    friends: Array,
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

const User = mongoose.model('User', userSchema);

module.exports = User;