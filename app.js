var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var htt//p =require('http'); 
var routes = require('./routes/index');
var users = require('./routes/users');
 var ejs = require('ejs');
 var mongodbClient= require('mongodb').MongoClient;
 var assert = require('assert');
//var SessionStore = require("session-mongoose")(express);
var connect = require('connect');
var url = 'mongodb://localhost:27017/test';
 var app = express();
var  server = require('http').createServer(app);
var io = require('socket.io')(server);
var http = require('http').Server(app);


/**
var cookieSession = require('cookie-session')
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}))
**/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/**
app.use(function(req, res, next){
res.locals.user = req.session.user;
next();
});



app.use(function(req, res, next){
res.locals.user = req.session.user;
var err = req.session.error;
delete req.session.error;
res.locals.message = '';
if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>';
next();
});
**/
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/**连接到mongoDb
**/
mongodbClient.connect(url,function(err,db){
	assert.equal(null,err);
	console.log("connect to your server");
	db.close();
	/**
	insert(db ,function(){
		updateCollection(db,function(){
	        deleteDocument(db,function(){
  findAllDocument(db, function() {				
		db.close();
		});
		});
		});
	});
	**/
});
// 启动及端口
//http.createServer(app).listen(app.get('port'), function(){
//console.log('Express server listening on port ' + app.get('port'));
//});

//往MongoDB添加多个数据
 var insert = function (db,callback){ 
  var 	 collection =db.collection('foo');  //指定某一个collection  
  var jason = "thi is a string";
   	 collection.insertMany([{a:jason},{age:20}],function(err,result){
		 assert.equal(err,null);
		 assert.equal(2,result.result.n);
		 assert.equal(2,result.ops.length);
		 console.log("you have insert two documents into the collection ");
		 callback(result);
	 });
	 
 };

//这个是增加数据  不是更新数据
 var updateCollection= function(db,callback){
	 var jason = "thi is a string";
	 var collection = db.collection('foo');
	 collection.updateOne({a:1},{$set:{b:"this is not"}},function(err,result){
		  assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
	callback(result);
	 });
	 
	 
 };

 
 //这个是删除数据
 var deleteDocument = function(db,callback){
	  var collection = db.collection('foo');
	  collection.deleteOne({age:20},function(err,result){
		  assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
		  
	  });
	 
	 
 };
 
 
 
 //find  all documents
 var findAllDocument= function (db,callback){
	 
	 var collection = db.collection('foo');
	 collection.find({}).toArray(function(err,docs){
		  assert.equal(err, null);
    //assert.equal(31, docs.length);
    console.log("Found the following records");
    console.dir(docs);
    callback(docs);
	 });
	 
 }
 /**
 http.listen(3000,function(){
	 console.log('listening to port  3000');
 });
 **/
module.exports = app;
