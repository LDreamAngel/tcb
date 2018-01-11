/*轮播图部分*/
var swiper = new Swiper('.swiper-container', {
	spaceBetween: 10,
	autoplay:true,//自动滑动
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
});

/*隐藏菜单部分*/
$(".menu-item").hover(function() {
	$(this).addClass('bg-green');
	var i = $(this).index()
	$(".hidden-menu-item").eq(i).show();

}, function() {
	$(this).removeClass('bg-green');
	var i = $(this).index()
	$(".hidden-menu-item").eq(i).hide();
})

$(".hidden-menu-item").hover(function() {
	$(this).show()
}, function() {
	$(this).hide()
})

//请求商家接口，获取所有商家数据
$.get('http://localhost:3000/store', function(res) {
	//var data = {data:res};
	var html = baidu.template('store-list-item-temp', res);
	$('#store-list').html(html);

	//商家数据分页展示   
	$("#page").paging({
		pageNo: 0, // 第几页
		totalPage: Math.ceil(res.total / 5), //向下取整，进行分页
		totalSize: res.total, // 移动有多少条数据
		callback: function(page) {
			// 在回调函数上获取到 点击的页码
			console.log(page)
			getStoreLimit(page - 1)
		}
	})
})

//分页查询
function getStore(page) {
	console.log('page', page);
	$.get('http://localhost:3000/storelimit', { page: page}, function(res) {
		var html = baidu.template('store-list-item-temp', res);
		$('#store-list').html(html);
	})
}

//手机详情页展示
$.get('http://localhost:3000/phone',function(res) {
	var html = baidu.template('phone_temp',res);
	$("#phone_lists").html(html);
	
	var str = JSON.stringify(res)
	window.localStorage.detail = str;
	//setItem()  localStory.a = a;     localStorage['a'] = a;
	
})
