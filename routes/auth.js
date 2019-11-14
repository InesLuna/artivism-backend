const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/User");

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

//GEt '/all
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
    const { username, email, aboutMe, userImage, password } = req.body;

    try {
  
      const usernameExists = await User.findOne({ username }, "username");
      const emailExists = await User.findOne({ email }, "email");

      if (usernameExists) return next(createError(400,'username already exist'));
      if (emailExists) return next(createError(400,'email already exist'));
  
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ username, email, aboutMe, userImage, password: hashPass });
     
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

router.put('/edit', isLoggedIn(), async (req, res, next) => {
  const user = req.session.currentUser;
  const { aboutMe, userImage } = req.body;
  const newUser = {
    aboutMe, 
    userImage
  }
  const userUpdated = await User.findByIdAndUpdate(user._id, newUser,{new:true})
  
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


module.exports = router;
