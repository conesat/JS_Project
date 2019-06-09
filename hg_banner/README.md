# Banner
基于jquery点击轮播

录屏:
![](https://github.com/conesat/JS_Project/blob/master/hg_banner/rec/REC.gif)

使用示例:
```JavaScript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<link rel="stylesheet" href="css/Banner.css" />
	<body>
		<div id="hg_banner">
			
		</div>
		<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
		<script type="text/javascript" src="js/Banner.js" ></script>
		<script type="text/javascript">
			$(function() {
				var items = new Array();
				items[0] = {
					'bgUrl':'img/bg/bg1.jpg',
					'url':'http://www.baidu.com',
					'title': '新年致辞',
					'content': '时序更迭，华章日新。2018年即将过去，充满希望的2019年正向我们走来。'
				};
				items[1] = {
					'bgUrl':'img/bg/bg1.jpg',
					'url':'',
					'title': '新年致辞',
					'content': '时序更迭，华章日新。2018年即将过去，充满希望的2019年正向我们走来。'
				};
				items[2] = {
					'bgUrl':'img/bg/bg2.jpg',
					'url':'',
					'title': '新年致辞',
					'content': '时序更迭，华章日新。2018年即将过去，充满希望的2019年正向我们走来。'
				};
				items[3] = {
					'bgUrl':'img/bg/bg1.jpg',
					'url':'',
					'title': '新年致辞',
					'content': '时序更迭，华章日新。2018年即将过去，充满希望的2019年正向我们走来。'
				};
				
				
				var banner=new Banner();//创建对象
				banner.load({'id':'hg_banner','items':items,'logo':'img/logo_sui.png','time':300});//加载 id为元素id items为数据 格式参照上方 logo为水印 time播放间隔
			})
			
			
		</script>
	</body>

</html>
```
