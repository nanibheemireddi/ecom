var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var decode = require('isodate-convert').decode

// load user route
//var routes = require('./routes/index');
var users = require('./routes/users');
var category = require('./routes/category');
var product = require('./routes/product');
var order = require('./routes/order');
var app = express();


// connection setup 
var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.set('port', process.env.PORT || 4300);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));


//connection peer

app.use(
connection(mysql,{

    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'ecommerce'
    }, 'pool')

);


app.get('/users', users.list);
app.get('/users/add', users.add);
app.post('/users/add', users.save);
app.get('/users/delete/:id', users.delete);
app.get('/users/edit/:id', users.edit);
app.post('/users/edit/:id', users.save_edit);


app.get('/category', category.category_list);
app.get('/category/add', category.add);
app.post('/category/add', category.category_save);
app.get('/category/delete/:id', category.category_delete);
app.get('/category/edit/:id', category.category_edit);
app.post('/category/edit/:id', category.category_save_edit);

app.get('/product', product.product_list);
app.get('/product/add', product.add);
app.post('/product/add', product.product_save);
app.get('/product/delete/:id', product.product_delete);
app.get('/product/edit/:id', product.product_edit);
app.post('/product/edit/:id', product.product_save_edit);

app.get('/order', order.order_list);
app.get('/order/add', order.add);
app.post('/order/add', order.order_save);
app.get('/order/delete/:id', order.order_delete);

app.get('/orders', order.update);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


