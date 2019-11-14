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
    userImage: {
        type:String,
        default:'https://res.cloudinary.com/dgd9bq9vs/image/upload/v1573740640/avatar-gallery/default-user-icon-11_ion4jo.jpg'
    },
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