const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Register route
router.post('/signup', registerUser);

// Login route
router.post('/login', loginUser);

module.exports = router;






// const express = require('express');
// const { check } = require('express-validator');
// const { registerUser, loginUser } = require('../controllers/authController');

// const router = express.Router();

// // Register route
// router.post(
//   '/register',
//   [
//     check('name', 'Name is required').not().isEmpty(),
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
//   ],
//   registerUser
// );

// // Login route
// router.post(
//   '/login',
//   [
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password is required').exists(),
//   ],
//   loginUser
// );

// module.exports = router;
