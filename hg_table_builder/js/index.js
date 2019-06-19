var TABLE_HTML =
	"<!DOCTYPE html>\n" +
	"<html>\n" +
	"	<head>" +
	'		<meta charset="utf-8">\n' +
	"		<title></title>\n" +
	"		<style>\n" +
	"			table {\n" +
	"				margin: 0 auto;\n" +
	"				text-align: center;\n" +
	"				table-layout: fixed;\n" +
	"				background: #fff;\n" +
	"				border: 1px solid #eee;\n" +
	"			}\n" +
	"			table td,\n" +
	"			table th {\n" +
	"				overflow: hidden;\n" +
	"				white-space: nowrap;\n" +
	"				text-overflow: ellipsis;\n" +
	"			}\n" +
	"		    #$#\n" +
	"		</style>\n" +
	"	</head>\n" +
	"	<body>\n" +
	"		<div>\n" +
	"			<table rules=all>\n" +
	"			$$\n" +
	"			</table>\n" +
	"		</div>\n" +
	"	</body>\n" +
	"</html>\n";

var flag = false;

function setTdBorSize() {
	var tds = TableBuilder.tbody.getElementsByClassName('selected');
	for (var i = 0; i < tds.length; i++) {
		tds[i].style.borderWidth = document.getElementById('td-bor-size').value + 'px';
	}
	TableBuilder.save();
}

function setTdBorColor() {
	var tds = TableBuilder.tbody.getElementsByClassName('selected');
	for (var i = 0; i < tds.length; i++) {
		tds[i].style.borderColor = document.getElementById('td-bor-color').value;
	}
	TableBuilder.save();
}

function setTdText() {
	var tds = TableBuilder.tbody.getElementsByClassName('selected');
	for (var i = 0; i < tds.length; i++) {
		tds[i].innerText = document.getElementById('td-text').value;
	}
	TableBuilder.save();
}

function setTextAlign() {
	var tds = TableBuilder.tbody.getElementsByClassName('selected');
	for (var i = 0; i < tds.length; i++) {
		tds[i].style.textAlign = document.getElementById('text-align').value;
	}
	TableBuilder.save();
}

function setTdWidth() {
	var tds = TableBuilder.tbody.getElementsByClassName('selected');
	for (var i = 0; i < tds.length; i++) {
		tds[i].style.width = document.getElementById('width').value + 'px';
	}
	TableBuilder.save();
}

function setFontColor() {
	var tds = TableBuilder.tbody.getElementsByClassName('selected');
	for (var i = 0; i < tds.length; i++) {
		tds[i].style.color = document.getElementById('font-color').value;
	}
	TableBuilder.save();
}

function setBgColor() {
	var tds = TableBuilder.tbody.getElementsByClassName('selected');
	for (var i = 0; i < tds.length; i++) {
		tds[i].style.background = document.getElementById('bg-color').value;
	}
	TableBuilder.save();
}

function fakeClick(obj) {
	var ev = document.createEvent("MouseEvents");
	ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	obj.dispatchEvent(ev);
}

function getHtml() {
	TABLE_HTML = TABLE_HTML.replace('$$', table.innerHTML);
	TABLE_HTML = TABLE_HTML.replace('#$#', TableBuilder.style.innerHTML);
	var urlObject = window.URL || window.webkitURL || window;
	var export_blob = new Blob([TABLE_HTML]);
	var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
	save_link.href = urlObject.createObjectURL(export_blob);
	save_link.download = 'table.html';
	fakeClick(save_link);
}


function init() {
	TableBuilder.init({
		id: 'table',
		cols: 5,
		rows: 5,
		padding: '2 5',
		onClick: function(data) {
			document.getElementById('td-text').value = data.innerHTML;
			document.getElementById('width').value = data.offsetWidth;
		}
	});

	document.getElementById('table-opr-r').style.display = 'flex';
	document.getElementById('table-opr-c').style.display = 'flex';
	document.getElementById('edit').style.display = '';

	initTable();
}

function addLine(CorR) {
	if (CorR == 'c') {
		TableBuilder.addCol(function() {
			initTable();
		});
	} else if (CorR == 'r') {
		TableBuilder.addRow(function() {
			initTable();
		});
	}
}

function deleteLine(CorR) {
	if (CorR == 'c') {
		TableBuilder.deleteCol(function() {
			initTable();
		});
	} else if (CorR == 'r') {
		TableBuilder.deleteRow(function() {
			initTable();
		});
	}
}

function unSuper() {
	event.preventDefault(); // 阻止默认行为
	event.stopPropagation(); // 阻止事件冒泡
}

function initTable() {
	ResizeTable.init({
		id: 'table'
	});
}

function redo() {
	TableBuilder.redo(function() {
		initTable();
	});
}

function undo() {
	TableBuilder.undo(function() {
		initTable();
	});
}

function toOne() {
	TableBuilder.toOne(function() {
		initTable();
	});
}

function toTow(CorR) {
	TableBuilder.toTow(CorR, function() {
		initTable();
	});
}

function load() {
	var moveSelected = document.getElementById('moveSelected');
	var tableDiv = document.getElementById('table-div');
	// 鼠标按下时开启拖拽多选，将遮罩定位并展现
	tableDiv.addEventListener('mousedown', function(event) {
		if (event.button != 0) return;
		if (event.pageY - tableDiv.offsetTop > tableDiv.offsetHeight - 20) return;
		if (event.pageX - tableDiv.offsetLeft > tableDiv.offsetWidth - 20) return;
		flag = true;
		moveSelected.style.top = event.pageY + 'px';
		moveSelected.style.left = event.pageX + 'px';
		oldLeft = event.pageX;
		oldTop = event.pageY;
		event.preventDefault(); // 阻止默认行为
		event.stopPropagation(); // 阻止事件冒泡
	})
	// 鼠标移动时计算遮罩的位置，宽 高
	tableDiv.addEventListener('mousemove', function(event) {
		if (!flag) return; //只有开启了拖拽，才进行mouseover操作
		if (event.pageX < oldLeft) { //向左拖
			moveSelected.style.left = event.pageX + 'px';
			moveSelected.style.width = (oldLeft - event.pageX) + 'px';
		} else {
			moveSelected.style.width = (event.pageX - oldLeft) + 'px';
		}
		if (event.pageY < oldTop) { //向上
			moveSelected.style.top = event.pageY + 'px';
			moveSelected.style.height = (oldTop - event.pageY) + 'px';
		} else {
			moveSelected.style.height = (event.pageY - oldTop) + 'px';
		}
		event.preventDefault(); // 阻止默认行为
		event.stopPropagation(); // 阻止事件冒泡
	});

	//鼠标抬起时计算遮罩的right 和 bottom，找出遮罩覆盖的块，关闭拖拽选中开关，清除遮罩数据
	tableDiv.addEventListener('mouseup', function(event) {
		isFromTd = false;
		if (!flag) {
			clearDragData();
			return;
		};
		moveSelected.style.bottom = Number(moveSelected.style.top.split('px')[0]) + Number(moveSelected.style.height.split(
			'px')[0]) + 'px';
		moveSelected.style.right = Number(moveSelected.style.left.split('px')[0]) + Number(moveSelected.style.width.split(
			'px')[0]) + 'px';
		//findSelected();
		TableBuilder.select(moveSelected.style.left.split('px')[0], moveSelected.style.right.split('px')[0],
			moveSelected.style.top.split('px')[0], moveSelected.style.bottom.split('px')[0]);
		flag = false;
		clearDragData();
		event.preventDefault(); // 阻止默认行为
		event.stopPropagation(); // 阻止事件冒泡
	});
	tableDiv.addEventListener('mouseleave', function(event) {
		flag = false;
		clearDragData();
		event.preventDefault(); // 阻止默认行为
		event.stopPropagation(); // 阻止事件冒泡
	});

	function clearDragData() {
		moveSelected.style.width = 0;
		moveSelected.style.height = 0;
		moveSelected.style.top = 0;
		moveSelected.style.left = 0;
		moveSelected.style.bottom = 0;
		moveSelected.style.right = 0;
	}
}

load();
