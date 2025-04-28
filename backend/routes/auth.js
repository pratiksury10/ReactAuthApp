const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming this is your User model
const { body, validationResult } = require('express-validator');

const router = express.Router();

// User Sign-up
router.post(
  '/signup',
  [
    // Validation rules
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    // Check if there are validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Create a new user
      user = new User({
        email,
        password,
        name,
      });

      // 🛡️ Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Generate JWT token
      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error("Sign-up Error:", err.message);
      res.status(500).send('Server Error');
    }
  }
);

// User Login
router.post(
  '/login',
  async (req, res) => {
    const { email, password } = req.body;

    console.log("Received data:", { email, password });  // Log incoming data for debugging

    // Validate the incoming data
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter both email and password' });
    }

    try {
      // Check if the user exists
      let user = await User.findOne({ email });
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Password mismatch");
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Generate JWT token
      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          console.error("JWT Error:", err);
          return res.status(500).json({ msg: 'Server error' });
        }
        res.json({ token });
      });
    } catch (err) {
      console.error("Login Error:", err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;














// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const { body, validationResult } = require('express-validator');

// const router = express.Router();

// // User Sign-up
// router.post(
//   '/signup',
//   [
//     body('email').isEmail().withMessage('Enter a valid email'),
//     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password, name } = req.body;

//     try {
//       let user = await User.findOne({ email });
//       if (user) {
//         return res.status(400).json({ msg: 'User already exists' });
//       }

//       user = new User({
//         email,
//         password,
//         name,
//       });

      
//       // 🛡️ Hash the password before saving
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(password, salt);

//       await user.save();

//       const payload = {
//         user: {
//           id: user._id,
//         },
//       };

//       jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// // User Login
// router.post(
//   '/login',
//   async (req, res) => {
//     const { email, password } = req.body;

//     try {
//       let user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ msg: 'Invalid credentials' });
//       }

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ msg: 'Invalid credentials' });
//       }

//       const payload = {
//         user: {
//           id: user._id,
//         },
//       };

//       jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

// module.exports = router;
