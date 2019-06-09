# Banner
新闻展示 js插件

录屏:
![](https://github.com/conesat/JS_Project/blob/master/hg_news/rec/REC.gif)

使用示例:
```JavaScript
<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title></title>
		<link rel="stylesheet" href="css/news.css" />
	</head>

	<body style="width: 100%;height: 100%;">
		<div style="width: 900px;margin: 100px auto;">
			<div id="gxut_news_content_one" class="gxut_news_content_item">

			</div>
		</div>

		<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
		<script type="text/javascript" src="js/news.js"></script>
		<script type="text/javascript">
			var items = new Array();
			items[0] = {
				'imgUrl': 'img/bg/bg1.jpg',
				'url': 'http://www.baidu.com',
				'title': '中共广西科技大学第一届委员会召开第七次全体会议',
				'content': '1月21日上午，中共广西科技大学第一届委员会第七次全体会议在行政办公楼多功能报告厅开幕。学校第一届党委会全体......'
			};
			items[1] = {
				'imgUrl': 'img/bg/bg2.jpg',
				'url': '',
				'title': '我校第一届教职工代表大会暨工会会员代表大会第八次会议顺利召开',
				'content': '1月18日下午，我校第一届教职工代表大会暨工会会员代表大会第八次会议在第四教学楼第4阶梯教室顺利召开，会议正......'
			};
			items[2] = {
				'imgUrl': 'img/bg/bg1.jpg',
				'url': '',
				'title': '中国大学生体育协会手球分会年会在我校召开',
				'content': '1月8日—9日，2018年中国大学生体育协会手球分会年会在我校召开。'
			};
			items[3] = {
				'imgUrl': 'img/bg/bg2.jpg',
				'url': '',
				'title': '新年致辞',
				'content': '时序更迭，华章日新。2018年即将过去，充满希望的2019年正向我们走来。'
			};
			items[4] = {
				'imgUrl': 'img/bg/bg1.jpg',
				'url': 'http://www.baidu.com',
				'title': '中共广西科技大学第一届委员会召开第七次全体会议',
				'content': '1月21日上午，中共广西科技大学第一届委员会第七次全体会议在行政办公楼多功能报告厅开幕。学校第一届党委会全体......'
			};
			items[5] = {
				'imgUrl': 'img/bg/bg2.jpg',
				'url': '',
				'title': '我校第一届教职工代表大会暨工会会员代表大会第八次会议顺利召开',
				'content': '1月18日下午，我校第一届教职工代表大会暨工会会员代表大会第八次会议在第四教学楼第4阶梯教室顺利召开，会议正......'
			};
			items[6] = {
				'imgUrl': 'img/bg/bg1.jpg',
				'url': '',
				'title': '中国大学生体育协会手球分会年会在我校召开',
				'content': '1月8日—9日，2018年中国大学生体育协会手球分会年会在我校召开。'
			};
			items[7] = {
				'imgUrl': 'img/bg/bg2.jpg',
				'url': '',
				'title': '新年致辞',
				'content': '时序更迭，华章日新。2018年即将过去，充满希望的2019年正向我们走来。'
			};
			var news = new News();
			news.load({
				'id': 'gxut_news_content_one',
				'items': items
			});
		</script>
	</body>

</html>
```
