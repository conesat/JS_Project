var ResizeTable = {
	resizeTd: undefined, //调整大小的组件
	oldTdWidth: undefined,
	oldTdHeight: undefined,
	oldTableWidth: undefined,
	oldTableHeight: undefined,
	oldTop: undefined,
	oldLeft: undefined,
	resizeFlag: false,
	resizePosition: undefined,
	resize: 'all',
	table: undefined,
	init: function(data) {
		if (data.id == undefined) {
			return;
		}
		ResizeTable.table = document.getElementById(data.id);
		if (data.resize != 'none') {
			resize = data.resize;
			var tds = ResizeTable.table.querySelectorAll('td,th');
			for (var i = 0; i < tds.length; i++) {
				tds[i].removeEventListener('mousedown', function(e) {
					ResizeTable.funcs.tdmousedown(this, e);
				});
				tds[i].addEventListener('mousedown', function(e) {
					ResizeTable.funcs.tdmousedown(this, e);
				});
				tds[i].removeEventListener('mousemove', function(e) {
					ResizeTable.funcs.tdmousemove(this, e);
				});
				tds[i].addEventListener('mousemove', function(e) {
					ResizeTable.funcs.tdmousemove(this, e);
				});
				tds[i].removeEventListener('mouseleave', function(e) {
					ResizeTable.funcs.tdmouseleave(this, e);
				});
				tds[i].addEventListener('mouseleave', function(e) {
					ResizeTable.funcs.tdmouseleave(this, e);
				});
			}
			document.addEventListener('mousemove', function() {
				if (ResizeTable.resizeFlag) {
					if (ResizeTable.resizePosition == 'col') {
						ResizeTable.resizeTd.style.width = ResizeTable.oldTdWidth + event.pageX - ResizeTable.oldLeft + 'px';
						ResizeTable.table.style.width = ResizeTable.oldTableWidth + event.pageX - ResizeTable.oldLeft + 'px';
					} else if (ResizeTable.resizePosition == 'row') {
						ResizeTable.resizeTd.style.height = ResizeTable.oldTdHeight + event.pageY - ResizeTable.oldTop + 'px';
						ResizeTable.table.style.height = ResizeTable.oldTableHeight + event.pageY - ResizeTable.oldTop + 'px';
					}
					return;
				}
			});
			document.addEventListener('mouseup', function() {
				if (ResizeTable.resizeFlag) {
					ResizeTable.resizeFlag = false;
					return;
				}
			})
		}
	},
	funcs: {
		tdmousedown: function(_this, e) {
			if (e.button == 0 && !ResizeTable.resizeFlag&&_this.style.cursor != 'default') {
				ResizeTable.resizeTd = _this;
				ResizeTable.resizeFlag = true;
				ResizeTable.oldTdWidth = _this.clientWidth - _this.style.paddingLeft.replace('px', '') - _this.style.paddingRight
					.replace(
						'px', '');
				ResizeTable.oldTdHeight = _this.clientHeight - _this.style.paddingTop.replace('px', '') - _this.style.paddingBottom
					.replace(
						'px', '');
				ResizeTable.oldTableWidth = ResizeTable.table.clientWidth - ResizeTable.table.style.paddingLeft.replace('px', '') - ResizeTable.table.style.paddingRight
					.replace(
						'px', '');
				ResizeTable.oldTableHeight = ResizeTable.table.clientHeight - ResizeTable.table.style.paddingTop.replace('px', '') - ResizeTable.table.style.paddingBottom
					.replace(
						'px', '');
				ResizeTable.oldTop = event.pageY;
				ResizeTable.oldLeft = event.pageX;
				if (_this.style.cursor == 'row-resize') {
					_this.style.height = ResizeTable.oldTdHeight + 'px';
					var find = _this;
					while (find.previousElementSibling != null) {
						find = find.previousElementSibling;
						find.style.height = 'auto';
					}
					find = _this;
					while (find.nextElementSibling != null) {
						find = find.nextElementSibling;
						find.style.height = 'auto';
					}
				}

				if (_this.style.cursor == 'col-resize') {
					_this.style.width = ResizeTable.oldTdWidth + 'px';
					var trs = _this.parentNode.parentNode.childNodes;
					for (var i = 0; i < trs.length; i++) {
						var tds = trs[i].childNodes;
						for (var j = 0; j < tds.length; j++) {
							if (tds[j] == _this) continue;
							if (tds[j].offsetLeft + tds[j].clientWidth == _this.offsetLeft + _this.clientWidth) {
								tds[j].style.width = 'auto';
							}
						}
					}
				}
				event.preventDefault(); // 阻止默认行为
				event.stopPropagation(); // 阻止事件冒泡 
			}
			return false;
		},
		tdmouseleave: function(_this, e) {
			if (!ResizeTable.resizeFlag) {
				_this.style.cursor = 'default';
				ResizeTable.resizeFlag=false;
			}
		},
		tdmousemove: function(_this, e) {
			if (!ResizeTable.resizeFlag) {
				_this.style.cursor = 'default';
				if ((ResizeTable.resize == 'all' || ResizeTable.resize == 'col') && e.offsetX >= _this.clientWidth - 5) {
					ResizeTable.resizePosition = 'col';
					_this.style.cursor = 'col-resize';
				} else if ((ResizeTable.resize == 'all' || ResizeTable.resize == 'row') && e.offsetY >= _this.clientHeight - 5) {
					ResizeTable.resizePosition = 'row';
					_this.style.cursor = 'row-resize';
				}
			}
		}
	}
}
