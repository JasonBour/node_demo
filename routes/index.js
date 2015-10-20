var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login',function(req,res){
	res.render('login',{title:'用户登录'});
});
router.get('/logout',function(req, res){
//	req.session.user=null;
	res.redirect('/');
});
router.get('/home',function(req,res){
var user={
username:'admin',
password:'admin'
}
res.render('home', { title: 'Home',user: user});
});

router.post('/login',function(req,res){
	
var user={
username:'admin',
password:'admin'
}
if(req.body.username===user.username && req.body.password===user.password){
	//req.session.user=user;
res.redirect('/home');
}else{
//req.session.error='用户名密码错误';
res.redirect('/login');
}
});


module.exports = router;
