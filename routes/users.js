var express = require('express');
var router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post('/register', catchAsync(async (req, res, next) => {
  try {
      const { email, password } = req.body;
      const user = new User({ email });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, err => {
        if (err) return next(err);
        req.flash('success', 'New account has been created');
        res.redirect('/');
      })
  } catch (e) {
      req.flash('error', e.message);
      res.redirect('register');
  }
}));

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
  const { email } = req.body;
  req.flash('success', `Welcome back ${ email }`);
  const redirectUrl = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/');
});

module.exports = router;
