function News() {
	this.load = function(data) {
		var parent = document.getElementById(data.id);

		var item = document.createElement("div");
		item.className = 'item';

		var item_img = document.createElement("div");
		item_img.className = 'item_img';
		item.appendChild(item_img);

		var items = document.createElement("div");
		items.className = 'items';
		var items_div = document.createElement("div");
		items.appendChild(items_div);
		item.appendChild(items);
		parent.appendChild(item);

		for(var i = 0; i < data.items.length; i++) {

			var item_imgs_parent = document.createElement("div");
			item_imgs_parent.className = 'img';

			var item_imgs = '<img src="' + data.items[i].imgUrl + '"></img>';
			item_imgs += '<div class="show">';
			item_imgs += '<div class="jt"></div>';
			item_imgs += '<div class="content">';
			item_imgs += '<h4>' + data.items[i].title + '</h4>';
			item_imgs += '<br />';
			item_imgs += '<p>' + data.items[i].content + '</p>';
			item_imgs += '<div class="news_more"><a href="' + data.items[i].url + '">更多</a></div></div></div>';
			item_imgs += '<h3 class="title">' + data.items[i].title + '</h3>';

			item_imgs_parent.innerHTML = item_imgs;

			item_img.appendChild(item_imgs_parent);

			var p = document.createElement("p");
			p.setAttribute("for", i)
			p.innerHTML = data.items[i].title;
			items_div.appendChild(p)
		}
		var befor = $("#" + data.id + " .item .items p").first();
		befor.css("color", '#439ac5');
		var tag = parseInt(befor.attr("for"));

		$("#" + data.id + " .item .items p").mouseenter(function() {
			befor.css("color", '#888');
			befor = $(this);
			tag = parseInt(befor.attr("for"));
			befor.css("color", '#439ac5');
			$("#" + data.id + " .item .item_img").stop(true,true); 
			$("#" + data.id + " .item .item_img").animate({
				top: -tag * 270
			})
		})

		function autoNext() {
			if($('#' + data.id).css("display") != 'none') {
				befor.css("color", '#888');
				if(tag < data.items.length - 1) {
					tag++;
					befor = befor.next();
				} else {
					tag = 0;
					befor = $("#" + data.id + " .item .items p").first();
				}
				$("#" + data.id + " .item .items div").scrollTop(tag * 50);
				befor.css("color", '#439ac5');
				$("#" + data.id + " .item .item_img").stop(true,true); 
				$("#" + data.id + " .item .item_img").animate({
					top: -tag * 270
				})
			}
		}

		var timer = setInterval(autoNext, 4000);

		$('#' + data.id).mouseenter(function() {
			clearInterval(timer);
			timer = null;
		});

		$('#' + data.id).mouseleave(function() {
			if(timer == null) {
				timer = setInterval(autoNext, 4000);
			}
		});
	}
}
