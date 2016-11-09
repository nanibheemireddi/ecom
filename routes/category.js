
var dateTime = require('date-time');


//listing Categories//

module.exports.category_list = function(req, res) {

	req.getConnection(function(err, connection) {
		var query = connection.query('select * from category', function(err, rows) {
			if(err) {
				console.log(err);
			} else {
				res.render('category', {page_title: "Categories - E-commerece", data:rows});
			}
		});
	});
}

//add category//

module.exports.add = function(req, res) {
	res.render('addcategory.ejs',{page_title:"Add Category - E-Commerce"});
}


//adding category in database//

module.exports.category_save = function(req, res) {
	//console.log('haii');
	var input = JSON.parse(JSON.stringify(req.body));

	//console.log(input);
	//console.log('haii');

	req.getConnection(function(err, connection) {
		var data;
		if(input.status === 'active') {
			data = {
				Name          : input.name,
				Description   : input.description,
				Status		  : input.status
			}
		} else {
			data = {
				Name          : input.name,
				Description   : input.description
				
			}
		}
		
		var query = connection.query('insert into category set ?', data, function(err, rows) {
			if(err) {
				console.log(err);
			} else {
				res.redirect('/category');
			}
		});
	});
}

//editing the category data//

module.exports.category_edit = function(req, res) {
	var id = req.params.id;
	req.getConnection(function(err, connection) {
		var query = connection.query('select * from category where categoryid = ?', [id], function(err, rows) {
			if(err) {
				console.log('hlllo');
				console.log(err);
			} else {
				console.log('haiiiii')
				res.render('editcategory.ejs', {page_title: "Edit categories - E-Commerce" , data:rows});
			}
		});
	});
}


//updating category data//

module.exports.category_save_edit = function(req, res) {
	var input = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;
	req.getConnection(function(err, connection) {
		var categorydata;
		if(input.status === 'active') { 
				categorydata = {
					Name 	    : input.name,
					Description : input.description,
					status      : 'active',
				    updatedon   : dateTime(new Date(), {local: true})
				    
				}
		} else {
			categorydata = {
					Name 	    : input.name,
					Description : input.description,
					status      : 'inactive',
				    updatedon   : dateTime(new Date(), {local: true})
				    
				}
		}		
		connection.query("update category set ? where categoryid = ?",[categorydata,id], function(err, rows) {
			if(err) {
				console.log(err);
			} else {
				res.redirect('/category');
			}
		});
	});
}


//deleting category data//

module.exports.category_delete = function(req, res) {
	var id  = req.params.id;
	//console.log(id);
	req.getConnection(function(err, connection) {
		connection.query("delete from category where categoryid = ?",[id], function(err, rows) {
			if (err) {
				console.log(err);
			} else {
				res.redirect('/category');
			}
		});
	});
}