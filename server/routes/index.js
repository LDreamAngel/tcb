var express = require('express');
var router = express.Router();

var connection = require('./db');

//跨域 CORS  cross orign resource sharing   跨域资源共享
router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

//返回商家数据
router.get('/store', function(req, res) {
	//查询一共有多少条语句
	var sql = "select count (*) from store";
	//解析数据并给出响应
	connection.query(sql, function(err, data) {
		if(err) {
			console.log(err);
		} else {
			var total = data[0]["count(*)"]; //获取总条数的数值，eg；20

			//查询第一页的数据。第一个参数表示总数据的索引下标，第二个参数表示每页所要展示的数据条数
			var sql = "select * from store limit 0,5"
			connection.query(sql, function(err, data) {
				if(err) {
					console.log(err)
				} else {
					var result = { total: total, data: data }
					res.send(result);
				}
			})
		}
	})
})

//分页接口
router.get('/storelimit', function(req, res) {

	var page = req.query.page;
	console.log('page', page)
	if(page != undefined) {

		var sql = "select *from store limit " + (page * 5) + ",5";
		connection.query(sql, function(err, data) {
			if(err) {
				console.log(err)
			} else {
				var result = { data: data }
				res.send(result)
			}
		})
	}

})

//请求手机列表的接口
router.get('/phone',function(req,res) {
	
	var sql = "select * from detail";
	connection.query(sql,function(err,data) {
		if (err) {
			console.log(err);
		} else{
			res.send({data:data});
		}
	})
})

module.exports = router;

