const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");

//cloudinary API
const uploadCloud = require('../configs/cloudinary-setup.js')

// HELPER FUNCTIONS

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin
} = require("../helpers/authMiddlewares");

//  GET    '/me'

router.get('/me', isLoggedIn(), (req, res, next) => {
  req.session.currentUser.password = '*';
  res.json(req.session.currentUser);
});

//GEt '/all'
router.get('/all', async (req, res, next) => {
  const usersList = await User.find()
  res.json(usersList);
});




//  POST    '/login'

router.post('/login', isNotLoggedIn(), validationLoggin(), async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }) ;
    if (!user) {
      next(createError(404, 'user not found'));
    } 
    else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res
        .status(200)
        .json(user);
      return 
    } 
    else {
      next(createError(401, 'wrong password'));
    }
  } 
  catch (error) {
    next(error);
  }
},
);

//  POST    '/signup'

router.post("/signup", isNotLoggedIn(), validationLoggin(), async (req, res, next) => {
    const { username, email, aboutMe, password, userImage } = req.body;
    console.log(req.body)

    try {
  
      const usernameExists = await User.findOne({ username }, "username");
      const emailExists = await User.findOne({ email }, "email");

      if (usernameExists) return next(createError(400,'username already exist'));
      if (emailExists) return next(createError(400,'email already exist'));
  
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPass = bcrypt.hashSync(password, salt);

      //Assemble new user
      const newUserDetails = {
        username,
        email,
        aboutMe,
        password:hashPass,
        userImage
      }

      //check if user included a custom avatar
      const newUser = await User.create(newUserDetails);
     
        req.session.currentUser = newUser;
        res
          .status(200) //  OK
          .json(newUser);
      
    } catch (error) {
      next(error);
    }
  }
);

//  POST    '/logout'

router.post('/logout', isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  res
    .status(204)  //  No Content
    .send();
  return; 
});

//  PUT    '/edit'

router.put('/edit', uploadCloud.single('userImage'), isLoggedIn(), async (req, res, next) => {
  const user = req.session.currentUser;
  const { aboutMe } = req.body;
  //setear detalles de usuario
  const newUserDetails = {
    aboutMe
  }
  if(req.file){
    newUserDetails.userImage = req.file.url;
  }
  const userUpdated = await User.findByIdAndUpdate(user._id, newUserDetails,{new:true})
  
  res.json(userUpdated);
  req.session.currentUser = userUpdated;
  return; 
});

//  DELETE    '/delete'

router.delete('/delete', isLoggedIn(), async (req, res, next) => {
  const user = req.session.currentUser;

  const userDelete = await User.findByIdAndDelete(user._id)
  req.session.destroy();
  res
    .status(204)  //  No Content
    .send();
  return; 
});

//  GET    '/private'   --> Only for testing - Same as /me but it returns a message instead

router.get('/private', isLoggedIn(), (req, res, next) => {
  res
    .status(200)  // OK
    .json({ message: 'Test - User is logged in'});
});

//GEt '/one'
router.get('/:id', isLoggedIn(), async (req, res, next) => {
  const userId = req.params.id 
  
  const findUser = await User.findById(userId)
  
  res.json(findUser);
});


module.exports = router;
