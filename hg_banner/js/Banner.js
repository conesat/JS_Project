function Banner() {
	this.load = function(data) {

		var html = '<div class="hg_banner"><div id="hg_banner_befor" class="hg_banner_befor"></div>' +
			'<div id="hg_banner_next" class="hg_banner_next"></div>' +
			'<div id="hg_banner_items" class="hg_banner_items"></div></div>';
		$('#' + data.id).append(html);

		var itemTag = 0;
		var items = data.items;
		for(var i = 0; i < items.length; i++) {
			var item = '';
			item += '<div class="hg_banner_item" tag="' + i + '" style="background-image: url(' + items[i].imgUrl + ');">';
			item += '<div class="hg_banner_item_content">';
			item += '<h3>' + items[i].title + '</h3>';
			item += '<label>' + items[i].content + '</label>';
			item += '<a href="' + items[i].url + '"><div class="hg_banner_item_content_detail">详细</div></a>';
			item += '<div class="hg_banner_item_content_logo"  style="background-image: url(' + data.logo + ');"></div>';
			item += '</div></div>';
			$('#hg_banner_items').append(item);
		}
		$(".hg_banner_items div").on("click", function() {
			var tag = $(this).attr("tag");
			if(tag < items.length && tag >= 0 && tag != itemTag) {
				changePosition(tag);
				var obj = $(this).children().first();
				obj.css("background", "#286ec4");
				obj.stop(true, true);
				obj.animate({
					top: 0
				});
			}
		});
		$(".hg_banner_items div").mouseenter(function() {
			var obj = $(this).children().first();
			var tag = $(this).attr("tag");
			if(tag == itemTag) {
				window.clearInterval(runer);
				runer = null;
				obj.css("background", "#286ec4");
				obj.stop(true, true);
				obj.animate({
					top: 0
				});
			} else {
				obj.stop(true, true);
				obj.animate({
					top: 120
				});
			}

		});

		$(".hg_banner_items div").mouseleave(function() {
			var obj = $(this).children().first();
			obj.css("background", "rgba(0,0,0,0)");
			obj.stop(true, true);
			obj.animate({
				top: 220
			});
			if(runer == null) {
				runer = setInterval(autoNext, data.time);
			}
		});
		$("#hg_banner_items").children().eq(itemTag).stop(true, true);
		$("#hg_banner_items").children().eq(itemTag).animate({
			top: 20,
			width: 600,
			height: 300
		});

		$('#hg_banner_next').on('click', function() {
			if(itemTag < items.length - 1) {
				changePosition(parseInt(itemTag) + 1);
			}
		});

		$('#hg_banner_befor').on('click', function() {
			if(itemTag > 0) {
				changePosition(parseInt(itemTag) - 1);
			}
		});

		var changePosition = function(op) {
			$("#hg_banner_items").children().eq(itemTag).stop(true, true);
			$("#hg_banner_items").children().eq(itemTag).animate({
				top: 60,
				width: 400,
				height: 200
			});
			itemTag = op;
			$("#hg_banner_items").children().eq(itemTag).stop(true, true);
			$("#hg_banner_items").children().eq(itemTag).animate({
				top: 20,
				width: 600,
				height: 300
			});
			$('#hg_banner_items').stop(true, true);
			$('#hg_banner_items').animate({
				left: -400 * itemTag + ($("#hg_banner_items").width() / 2 - 300)
			})
		}
		var runer = null;

		if(data.time != '' || data.time != undefined) {
			runer = setInterval(autoNext, data.time);
		}

		function autoNext() {
			if(itemTag < items.length - 1) {
				changePosition(parseInt(itemTag) + 1);
			} else {
				changePosition(0);
			}
		}
	}
}
