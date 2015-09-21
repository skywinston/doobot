var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var List = require('../models/list');
var router = express.Router();


router.get('/', function (req, res, next) {
  Account.find( { username : req.user.username }, function(err, user){
    console.log("This should be the user object from the db:");
    console.log(user);
    List.find( { userId : user[0]._id }, function(err, lists){
      console.log("This should be an array below:");
      console.log(lists);
      res.render('index', {
        user : req.user,
        lists : lists
      });
    });
  });
});

router.get('/current_user', function(req, res, next) {
  console.log("Log in current_user Route", req.user);
  res.json({user: req.user});
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { info: "Sorry, that username already exists." });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
