var TableBuilder = {
	table: undefined,
	tbody: undefined,
	tdWidth: '40',
	height: '20',
	textColor: '#676767',
	bgColor: '#fff',
	borderColor: '#eee',
	borderWidth: '1',
	padingLR: '5',
	padingTB: '2',
	cols: 0,
	rows: 0,
	trs: undefined, //保存的数据
	onClick: undefined,
	text: '',
	DO_LIST: new Array(),
	DO_LIST_POS: 0,
	isOnDoUnDO: false, //是否处于重置撤销中
	style: undefined,
	init: function(data) {
		if (data.id == undefined) return;
		TableBuilder.style = document.createElement('style');
		TableBuilder.style.innerText = 'table td,table th{';
		TableBuilder.table = document.getElementById(data.id);
		TableBuilder.table.innerHTML = '';
		TableBuilder.tbody = document.createElement('tbody');
		TableBuilder.table.appendChild(TableBuilder.tbody);
		if (data.width != undefined) {
			TableBuilder.tdWidth = data.width;
		}
		if (data.height != undefined) {
			TableBuilder.height = data.height;
		}
		if (data.textColor != undefined) {
			TableBuilder.textColor = data.textColor;
		}
		if (data.bgColor != undefined) {
			TableBuilder.bgColor = data.bgColor;
		}
		if (data.borderColor != undefined && data.borderWidth != undefined) {
			TableBuilder.borderWidth = data.borderWidth;
			TableBuilder.borderColor = data.borderColor;
		}

		if (data.onClick != undefined) {
			TableBuilder.onClick = data.onClick;
		}
		if (data.text != undefined) {
			TableBuilder.text = data.text;
		}
		if (data.padding != undefined) {
			var padings = data.padding.split(" ");
			if (padings.length == 2) {
				TableBuilder.padingTB = padings[0];
				TableBuilder.padingLR = padings[1];
			} else if (padings.length == 1) {
				TableBuilder.padingLR = padings[0];
				TableBuilder.padingTB = padings[0];
			}
		}
		if (data.cols != undefined) {
			TableBuilder.cols = data.cols;
		}
		if (data.rows != undefined) {
			TableBuilder.rows = data.rows;
		}

		if (TableBuilder.trs != undefined) {
			TableBuilder.trs.splice(0, TableBuilder.trs.length);
		} else {
			TableBuilder.trs = new Array();
		}
		TableBuilder.style.innerText += 'width:' + TableBuilder.tdWidth + 'px;';
		TableBuilder.style.innerText += 'height:' + TableBuilder.height + 'px;';
		TableBuilder.style.innerText += 'color:' + TableBuilder.textColor + ';';
		TableBuilder.style.innerText += 'background:' + TableBuilder.bgColor + ';';
		TableBuilder.style.innerText += 'border:' + TableBuilder.borderWidth + 'px solid ' + TableBuilder.borderColor + ';';
		TableBuilder.style.innerText += 'padding:' + TableBuilder.padingTB + 'px ' + TableBuilder.padingLR + 'px;';
		TableBuilder.style.innerText += 'font-size:16px';
		TableBuilder.style.innerText += 'white-space:nowrap';
		TableBuilder.style.innerText += '\n}';
		document.getElementsByTagName('head')[0].appendChild(TableBuilder.style);
		TableBuilder.DO_LIST.splice(0, TableBuilder.DO_LIST.length);
		DO_LIST_POS = 0;
		for (var r = 0; r < TableBuilder.rows; r++) {
			var tr = new Array();
			for (var c = 0; c < TableBuilder.cols; c++) {
				var td = {};
				/* 	td.width = TableBuilder.tdWidth;
					td.height = TableBuilder.height;
					td.padding = TableBuilder.padingTB + 'px ' + TableBuilder.padingLR + 'px'; */
				td.html = TableBuilder.text;
				/* td.fontSize = '16px';
				td.textColor = TableBuilder.textColor;
				td.bgColor = TableBuilder.bgColor;
				td.borderColor = TableBuilder.borderColor;
				td.borderWidth = TableBuilder.borderWidth; */
				td.rowspan = 1;
				td.colspan = 1;
				tr.push(td);
			}
			TableBuilder.trs.push(tr);
		}

		TableBuilder.loadData(TableBuilder.trs);
	},
	loadData: function(data) {
		TableBuilder.table.style.width = 'auto';
		TableBuilder.table.style.height = 'auto';
		TableBuilder.tbody.innerHTML = '';
		for (var r = 0; r < data.length; r++) {
			var tr = document.createElement('tr');
			for (var c = 0; c < data[r].length; c++) {
				if (data[r][c] == null) {
					data[r].splice(c, 1);
					c--;
					continue;
				}
				var td = document.createElement('td');
				if (Math.abs(data[r][c].width - TableBuilder.tdWidth) > 3) {
					td.style.width = data[r][c].width + 'px';
				}
				if (Math.abs(data[r][c].height - TableBuilder.height) > 3) {
					td.style.height = data[r][c].height + 'px';
				}
				if (data[r][c].padding != TableBuilder.padingTB + 'px ' + TableBuilder.padingLR + 'px') {
					td.style.padding = data[r][c].padding;
				}
				if (data[r][c].borderWidth != TableBuilder.borderWidth || data[r][c].borderColor != TableBuilder.borderColor) {
					td.style.border = data[r][c].borderWidth + 'px solid ' + data[r][c].borderColor;
				}
				if (data[r][c].textColor != TableBuilder.textColor) {
					td.style.color = data[r][c].textColor;
				}
				if (data[r][c].bgColor != TableBuilder.bgColor) {
					td.style.background = data[r][c].bgColor;
				}
				if (data[r][c].fontSize != '16px') {
					td.style.fontSize = data[r][c].fontSize;
				}

				td.setAttribute('rowspan', data[r][c].rowspan);
				td.setAttribute('colspan', data[r][c].colspan);
				td.innerHTML = data[r][c].html;
				td.addEventListener('mousedown', function(e) {
					var ctrlKey = e.ctrlKey || e.metaKey;
					if (e.button == 0 && this.style.cursor == 'default') {
						if (!ctrlKey) {
							TableBuilder.unSelect();
							try {
								if (typeof TableBuilder.onClick === "function") { //是函数    其中 FunName 为函数名称
									TableBuilder.onClick(this);
								}
							} catch (e) {}
						} else {
							event.preventDefault(); // 阻止默认行为
							event.stopPropagation(); // 阻止事件冒泡 
						}
						this.classList.add("selected");
					}
				});
				td.addEventListener('mousemove', function(e) {
					if (ResizeTable.resizeFlag || flag) return;
					while (TableBuilder.tbody.getElementsByClassName('tdh-hover').length > 0) {
						TableBuilder.tbody.getElementsByClassName('tdh-hover')[0].classList.remove('tdh-hover');
					}
					this.classList.add('tdh-hover');
				});
				td.addEventListener('mouseleave', function(e) {
					this.classList.remove('tdh-hover');
				});
				tr.appendChild(td);
			}
			TableBuilder.tbody.appendChild(tr);
		}
		if (!TableBuilder.isOnDoUnDO) {
			TableBuilder.saveDo();
		} else {
			TableBuilder.isOnDoUnDO = false;
		}

	},
	unSelect: function() {
		while (TableBuilder.tbody.getElementsByClassName('selected').length > 0) {
			TableBuilder.tbody.getElementsByClassName('selected')[0].classList.remove('selected');
		}
	},
	getSelect: function() {
		return TableBuilder.tbody.getElementsByClassName('selected');
	},
	getData: function() {
		return TableBuilder.trs;
	},
	addCol: function(finish) {
		TableBuilder.save();
		var tr = new Array();
		var cols = 0;
		for (var r = 0; r < TableBuilder.trs.length; r++) {
			if (TableBuilder.trs[r].length > cols) {
				cols = TableBuilder.trs[r].length;
			}
		}
		TableBuilder.cols = cols;
		for (var c = 0; c < TableBuilder.cols; c++) {
			var td = {};
			/* td.width = TableBuilder.tdWidth;
			td.height = TableBuilder.height;
			td.padding = TableBuilder.padingTB + 'px ' + TableBuilder.padingLR + 'px'; */
			td.html = TableBuilder.text;
			/* td.fontSize = '16px';
			td.textColor = TableBuilder.textColor;
			td.bgColor = TableBuilder.bgColor;
			td.borderColor = TableBuilder.borderColor;
			td.borderWidth = TableBuilder.borderWidth; */
			td.rowspan = 1;
			td.colspan = 1;
			tr.push(td);
		}
		TableBuilder.trs.push(tr);
		TableBuilder.rows = TableBuilder.trs.length;
		TableBuilder.loadData(TableBuilder.trs);
		try {
			if (typeof finish === "function") { //是函数    其中 FunName 为函数名称
				finish();
			}
		} catch (e) {}
	},
	addRow: function(finish) {
		TableBuilder.save();
		for (var r = 0; r < TableBuilder.trs.length; r++) {
			var td = {};
			td.html = TableBuilder.text;
			/* td.width = TableBuilder.tdWidth;
			td.height = TableBuilder.height;
			td.padding = TableBuilder.padingTB + 'px ' + TableBuilder.padingLR + 'px';
			td.fontSize = '16px';
			td.textColor = TableBuilder.textColor;
			td.bgColor = TableBuilder.bgColor;
			td.borderColor = TableBuilder.borderColor;
			td.borderWidth = TableBuilder.borderWidth; */
			td.rowspan = 1;
			td.colspan = 1;
			TableBuilder.trs[r].push(td);
		}
		TableBuilder.loadData(TableBuilder.trs);
		try {
			if (typeof finish === "function") { //是函数    其中 FunName 为函数名称
				finish();
			}
		} catch (e) {}
	},
	deleteCol: function(finish) {
		TableBuilder.save();
		TableBuilder.table.style.height = TableBuilder.table.clientHeight - TableBuilder.table.style.paddingTop.replace(
			'px', '') - TableBuilder.table.style.paddingBottom.replace(
			'px', '') - TableBuilder.trs[TableBuilder.trs.length - 1][0].height - TableBuilder.trs[TableBuilder.trs.length -
			1][0].borderWidth * 2 + 'px';
		TableBuilder.trs.splice(TableBuilder.trs.length - 1, 1);
		TableBuilder.rows--;
		TableBuilder.loadData(TableBuilder.trs);
		try {
			if (typeof finish === "function") { //是函数    其中 FunName 为函数名称
				finish();
			}
		} catch (e) {}
	},
	deleteRow: function() {
		TableBuilder.save();
		for (var r = 0; r < TableBuilder.trs.length; r++) {
			TableBuilder.trs[r].splice(TableBuilder.trs[r].length - 1, 1);
		}
		TableBuilder.loadData(TableBuilder.trs);
		try {
			if (typeof finish === "function") { //是函数    其中 FunName 为函数名称
				finish();
			}
		} catch (e) {}
		TableBuilder.cols--;
	},
	save: function() {
		for (var r = 0; r < TableBuilder.trs.length; r++) {
			for (var c = 0; c < TableBuilder.trs[r].length; c++) {
				var td = TableBuilder.tbody.childNodes[r].childNodes[c];
				TableBuilder.style.innerText += 'width:' + TableBuilder.tdWidth + 'px;';
				TableBuilder.style.innerText += 'height:' + TableBuilder.height + 'px;';
				TableBuilder.style.innerText += 'color:' + TableBuilder.textColor + ';';
				TableBuilder.style.innerText += 'background:' + TableBuilder.bgColor + ';';
				TableBuilder.style.innerText += 'border:' + TableBuilder.borderWidth + 'px solid ' + TableBuilder.borderColor +
					';';
				TableBuilder.style.innerText += 'padding:' + TableBuilder.padingTB + 'px ' + TableBuilder.padingLR + 'px;';
				TableBuilder.style.innerText += 'font-size:16px';
				if (td.style.background != TableBuilder.bgColor) {
					TableBuilder.trs[r][c].bgColor = td.style.background;
				}
				if (td.style.border.split(' solid ')[1] != TableBuilder.borderColor) {
					TableBuilder.trs[r][c].borderColor = td.style.border.split(' solid ')[1];
				}
				if (td.style.border.split(' solid ')[0] != TableBuilder.borderWidth) {
					TableBuilder.trs[r][c].borderWidth = td.style.border.split('px')[0];
				}
				var w = td.clientWidth - TableBuilder.padingLR * 2;

				if (Math.abs(w - TableBuilder.tdWidth) > 3) {
					TableBuilder.trs[r][c].width = w;
				}
				var h = td.clientHeight - TableBuilder.padingTB * 2;
				if (Math.abs(h - TableBuilder.height) > 3) {
					TableBuilder.trs[r][c].height = h;
				}
				if (td.style.padding != TableBuilder.padingTB + 'px ' + TableBuilder.padingLR + 'px') {
					TableBuilder.trs[r][c].padding = td.style.padding;
				}
				if (td.style.color != TableBuilder.textColor) {
					TableBuilder.trs[r][c].textColor = td.style.color;
				}
				if (td.style.fontSize != '16px') {
					TableBuilder.trs[r][c].fontSize = td.style.fontSize;
				}
				TableBuilder.trs[r][c].rowspan = td.getAttribute('rowspan');
				TableBuilder.trs[r][c].colspan = td.getAttribute('colspan');
				TableBuilder.trs[r][c].html = td.innerHTML;
			}
		}
		TableBuilder.saveDo();
	},
	select: function(l, r, t, b) {
		TableBuilder.unSelect();
		var trs = TableBuilder.tbody.childNodes;
		for (var i = 0; i < trs.length; i++) {
			var tds = trs[i].childNodes;
			for (var j = 0; j < tds.length; j++) {
				var left = tds[j].offsetLeft + TableBuilder.table.offsetLeft;
				var right = tds[j].offsetWidth + left;
				var top = tds[j].offsetTop + TableBuilder.table.offsetTop;
				var bottom = tds[j].offsetHeight + top;
				//判断每个块是否被遮罩盖住（即选中）
				var leftFlag = l <= left && left <= r;
				var rightFlag = l <= right && right <= r;
				var centerLR = l >= left && r >= left && l <= right && r <= right;
				var topFlag = t <= top && top <= b;
				var bottomFlag = t <= bottom && bottom <= b;
				var centerTP = t >= top && b >= top && t <= bottom && b <= bottom;
				if ((leftFlag || rightFlag || centerLR) && (topFlag || bottomFlag || centerTP)) {
					tds[j].classList.add("selected");
				}
			}
		}
	},
	toOne: function(finish) {
		var colspan = 0;
		var rowspan = 0;
		var td = '';
		var trs = TableBuilder.tbody.childNodes;
		var W = 0;
		var H = 0;
		var width = 0,
			height = 0;
		var text = '';
		var TD = '';
		for (var i = 0; i < trs.length; i++) {
			var tds = trs[i].childNodes;
			for (var j = 0; j < tds.length; j++) {
				if (tds[j].className.indexOf('selected') >= 0) {
					if (td == '') {
						td = tds[j];
						TD = TableBuilder.trs[i][j];
						rowspan = td.getAttribute('rowspan');
						colspan = td.getAttribute('colspan');
						H = td.offsetTop + td.offsetHeight;
						W = td.offsetLeft + td.offsetWidth;
						height = tds[j].clientHeight - tds[j].style.paddingTop.replace('px', '') - tds[j].style.paddingBottom.replace(
							'px', '');
						width = tds[j].clientWidth - tds[j].style.paddingLeft.replace('px', '') - tds[j].style.paddingRight.replace(
							'px', '');
						if (td.innerHTML != '' && text == '') {
							text = tds[j].innerHTML;
						}
					} else {
						if (tds[j].offsetLeft == td.offsetLeft) {
							if (tds[j].getAttribute('colspan') == td.getAttribute('colspan')) {
								if (tds[j].innerHTML != '' && text == '') {
									text = tds[j].innerHTML;
								}
								TableBuilder.trs[i][j] = null;
								rowspan = parseInt(rowspan) + parseInt(tds[j].getAttribute('rowspan'));
								H += tds[j].offsetHeight;
								height += tds[j].offsetHeight;
							} else {
								return;
							}
						} else if (tds[j].offsetTop == td.offsetTop) {
							if (tds[j].getAttribute('rowspan') == td.getAttribute('rowspan')) {
								if (tds[j].innerHTML != '' && text == '') {
									text = tds[j].innerHTML;
								}
								colspan = parseInt(colspan) + parseInt(tds[j].getAttribute('colspan'));
								W += tds[j].offsetWidth;
								width += tds[j].offsetWidth;
								TableBuilder.trs[i][j] = null;
							} else {
								return;
							}
						} else if (!((tds[j].offsetLeft + tds[j].offsetWidth) <= W && tds[j].offsetLeft >= td.offsetLeft && (tds[j].offsetTop +
								tds[j].offsetHeight) <= H && tds[j].offsetTop >= td.offsetTop)) {
							return;
						} else {
							TableBuilder.trs[i][j] = null;
						}
					}
				}
			}
		}
		if (width != 0) {
			TD.width = width;
		}
		if (height != 0) {
			TD.height = height;
		}
		if (rowspan == TableBuilder.trs.length) {
			colspan = 1;
		}
		TD.colspan = colspan;
		TD.rowspan = rowspan;

		TD.text = text;
		for (var i = TableBuilder.trs.length - 1; i >= 0; i--) {
			var maxC = 0;
			for (var j = TableBuilder.trs[i].length - 1; j >= 0; j--) {
				if (TableBuilder.trs[i][j] == null) {
					TableBuilder.trs[i].splice(j, 1);
				} else {
					maxC++;
				}
			}
			if (maxC == 1) {
				TableBuilder.trs[i][0].rowspan = 1;
			}
			if (TableBuilder.trs[i].length == 0) {
				TableBuilder.trs.splice(i, 1);
			}
		}
		TableBuilder.loadData(TableBuilder.trs);
		try {
			if (typeof finish === "function") { //是函数    其中 FunName 为函数名称
				finish();
			}
		} catch (e) {}
	},
	toTow: function(CorR, finish) {
		if (TableBuilder.tbody.getElementsByClassName('selected').length > 1) return;
		var td = TableBuilder.tbody.getElementsByClassName('selected')[0];
		if (td == undefined) return;
		if (td.getAttribute('colspan') == 1 && CorR == 'c') {
			var trs = TableBuilder.tbody.childNodes;
			for (var i = 0; i < trs.length; i++) {
				var tds = trs[i].childNodes;
				for (var j = 0; j < tds.length; j++) {
					if (tds[j].offsetLeft + tds[j].offsetWidth == td.offsetLeft + td.offsetWidth) {
						if (tds[j] != td) {
							tds[j].setAttribute('colspan', parseInt(tds[j].getAttribute('colspan')) * 2)
						}
						TableBuilder.trs[i][j].colspan = TableBuilder.trs[i][j].colspan * 2;
					}
				}
			}
			td.setAttribute('colspan', parseInt(td.getAttribute('colspan')) * 2)
		};
		var I = 0;
		if (td.getAttribute('rowspan') == 1 && CorR == 'r') {
			var trs = TableBuilder.tbody.childNodes;
			for (var i = 0; i < trs.length; i++) {
				var tds = trs[i].childNodes;
				for (var j = 0; j < tds.length; j++) {
					if (tds[j].offsetTop + tds[j].offsetHeight == td.offsetTop + td.offsetHeight) {
						if (tds[j] != td) {
							tds[j].setAttribute('rowspan', parseInt(tds[j].getAttribute('rowspan')) * 2)
						} else {
							I = i;
						}
						TableBuilder.trs[i][j].rowspan = TableBuilder.trs[i][j].rowspan * 2;
					}
				}
			}
			td.setAttribute('rowspan', parseInt(td.getAttribute('rowspan')) * 2)
			var tr = document.createElement('tr');
			if (I == TableBuilder.trs.length - 1) {
				TableBuilder.tbody.appendChild(tr);
				TableBuilder.trs.push(new Array());
			} else {
				TableBuilder.trs.splice(I + 1, 0, new Array());
				TableBuilder.tbody.insertBefore(tr, td.parentNode.nextSibling);
			}
		};
		var trs = TableBuilder.tbody.childNodes;
		for (var i = 0; i < trs.length; i++) {
			var tds = trs[i].childNodes;
			for (var j = 0; j < tds.length; j++) {
				if (tds[j].className.indexOf('selected') >= 0) {
					var colspan = tds[j].getAttribute('colspan');
					var rowspan = parseInt(tds[j].getAttribute('rowspan'));
					if (CorR == 'c' && colspan > 1) {
						var td = {};
						var newcolspan = parseInt(colspan / 2);
						td.html = TableBuilder.text;
						td.width = tds[j].clientWidth / colspan * newcolspan - TableBuilder.padingLR * 2 - TableBuilder.trs[i][j].borderWidth *
							2;
						//	td.padding = TableBuilder.padingTB + 'px ' + TableBuilder.padingLR + 'px';
						//	td.fontSize = '16px';
						if (TableBuilder.trs[i][j].textColor != undefined) {
							td.textColor = TableBuilder.trs[i][j].textColor;
						}
						if (TableBuilder.trs[i][j].bgColor != undefined) {
							td.bgColor = TableBuilder.trs[i][j].bgColor;
						}
						if (TableBuilder.trs[i][j].borderColor != undefined) {
							td.borderColor = TableBuilder.trs[i][j].borderColor;
						}
						if (TableBuilder.trs[i][j].borderWidth != undefined) {
							td.borderWidth = TableBuilder.trs[i][j].borderWidth;
						}
						if (TableBuilder.trs[i][j].rowspan != undefined) {
							td.rowspan = TableBuilder.trs[i][j].rowspan;
						}
						//	td.rowspan = TableBuilder.trs[i][j].rowspan;
						td.colspan = newcolspan;
						TableBuilder.trs[i][j].colspan = colspan - newcolspan;
						TableBuilder.trs[i][j].width = tds[j].clientWidth * (1 - newcolspan / colspan) - tds[j].style.paddingLeft.replace(
							'px', '') - tds[j].style.paddingRight.replace(
							'px', '') - tds[j].style.border.split(' ')[0].replace('px', '');
						TableBuilder.trs[i].splice(j, 0, td);
						TableBuilder.loadData(TableBuilder.trs);
						try {
							if (typeof finish === "function") { //是函数    其中 FunName 为函数名称
								finish();
							}
						} catch (e) {}
						return;
					} else if (CorR == 'r' && rowspan > 1) {
						var newrowspan = parseInt(rowspan / 2);
						var td = {};
						td.html = TableBuilder.text;
						td.height = tds[j].clientHeight / rowspan * newrowspan - TableBuilder.padingTB * 2 - TableBuilder.trs[i][j].borderWidth *
							2;
						//td.padding = TableBuilder.padingTB + 'px ' + TableBuilder.padingLR + 'px';
						//	td.fontSize = '16px';
						if (TableBuilder.trs[i][j].textColor != undefined) {
							td.textColor = TableBuilder.trs[i][j].textColor;
						}
						if (TableBuilder.trs[i][j].bgColor != undefined) {
							td.bgColor = TableBuilder.trs[i][j].bgColor;
						}
						if (TableBuilder.trs[i][j].borderColor != undefined) {
							td.borderColor = TableBuilder.trs[i][j].borderColor;
						}
						if (TableBuilder.trs[i][j].borderWidth != undefined) {
							td.borderWidth = TableBuilder.trs[i][j].borderWidth;
						}
						if (TableBuilder.trs[i][j].colspan != undefined) {
							td.colspan = TableBuilder.trs[i][j].colspan;
						}
						/* 	td.textColor = TableBuilder.trs[i][j].textColor;
							td.bgColor = TableBuilder.trs[i][j].bgColor;
							td.borderColor = TableBuilder.trs[i][j].borderColor;
							td.borderWidth = TableBuilder.trs[i][j].borderWidth;
							td.colspan = TableBuilder.trs[i][j].colspan; */
						td.rowspan = newrowspan;
						TableBuilder.trs[i][j].rowspan = rowspan - newrowspan;
						TableBuilder.trs[i][j].height = tds[j].clientHeight * (1 - newrowspan / rowspan) - tds[j].style.paddingTop.replace(
							'px', '') - tds[j].style.paddingBottom.replace(
							'px', '') - tds[j].style.border.split(' ')[0].replace('px', '');
						var pos = -1;
						var t = rowspan - newrowspan + i;
						if (TableBuilder.trs[t].length == 0) {
							pos = t;
						} else {
							for (var p = 0; p < trs[t].childNodes.length; p++) {
								if (trs[t].childNodes[p].offsetLeft >= tds[j].offsetLeft + tds[j].offsetWidth) {
									pos = p;
									break;
								}
							}
						}

						if (pos == -1) {
							pos = trs[t].childNodes.length - 1;
						}
						TableBuilder.trs[t].splice(pos, 0, td);


						TableBuilder.loadData(TableBuilder.trs);
						try {
							if (typeof finish === "function") { //是函数    其中 FunName 为函数名称
								finish();
							}
						} catch (e) {}
						return;
					} else {
						return;
					}
				}
			}
		}
	},
	redo: function(finish) {
		TableBuilder.isOnDoUnDO = true;
		if (TableBuilder.DO_LIST_POS < TableBuilder.DO_LIST.length - 1) {
			TableBuilder.DO_LIST_POS++;
			TableBuilder.trs = JSON.parse(JSON.stringify(TableBuilder.DO_LIST[TableBuilder.DO_LIST_POS]));
			TableBuilder.loadData(TableBuilder.trs);
			try {
				if (typeof finish === "function") { //是函数    其中 FunName 为函数名称
					finish();
				}
			} catch (e) {}
		}
	},
	undo: function(finish) {
		TableBuilder.isOnDoUnDO = true;
		if (TableBuilder.DO_LIST_POS > 0) {
			TableBuilder.DO_LIST_POS--;
			TableBuilder.trs = JSON.parse(JSON.stringify(TableBuilder.DO_LIST[TableBuilder.DO_LIST_POS]));
			TableBuilder.loadData(TableBuilder.trs);
			try {
				if (typeof finish === "function") { //是函数    其中 FunName 为函数名称
					finish();
				}
			} catch (e) {}
		}
	},
	saveDo: function() {
		if (TableBuilder.DO_LIST.length > 50) {
			TableBuilder.DO_LIST.splice(0, 1);
			TableBuilder.DO_LIST--;
		}
		if (TableBuilder.DO_LIST.length - 1 > TableBuilder.DO_LIST_POS) {
			TableBuilder.DO_LIST.splice(TableBuilder.DO_LIST_POS + 1, TableBuilder.DO_LIST.length);
		}
		TableBuilder.DO_LIST.push(JSON.parse(JSON.stringify(TableBuilder.trs)));
		TableBuilder.DO_LIST_POS = TableBuilder.DO_LIST.length - 1;
	},
	imgToTable: function(imgData) {
		var bgColor = [0, 0, 0];
		var width = imgData.width * 4;
		var height = imgData.height;
		var left = 0,
			right = 0,
			top = 0,
			bottom = 0;
		bgColor[0] = imgData.data[0];
		bgColor[1] = imgData.data[1];
		bgColor[2] = imgData.data[2];



		var getTd = function(x, y) {
			var getWidth = function() {
				for (var i = x + tdBorderLeftWidth; i < width; i += 4) {
					if (tdBorderColor[0] == imgData.data[(y + tdBorderTopWidth) * width + i] && tdBorderColor[1] == imgData.data[(
							y + tdBorderTopWidth) * width + i + 1] &&
						tdBorderColor[2] == imgData.data[
							(y + tdBorderTopWidth) * width + i + 2]) {
						return (i - x) / 4;
					}
				}
			}
			var getHeight = function() {
				var border = 0;
				var tdh = 0;
				for (var i = y + tdBorderTopWidth; i < height; i++) {
					if (tdBorderColor[0] == imgData.data[i * width + x + tdBorderLeftWidth] && tdBorderColor[1] == imgData.data[i *
							width +
							x + tdBorderLeftWidth + 1] &&
						tdBorderColor[2] == imgData.data[
							i * width + x + tdBorderLeftWidth + 2]) {
						return tdh;
					} else {
						tdh++;
					}
				}
			}

			var getBorderWidth = function() {
				for (var i = x, j = y; i < width, j < height; i += 4, j++) {
					if (Math.abs(tdBorderColor[0] - imgData.data[j * width + i]) > 10 ||
						Math.abs(tdBorderColor[1] - imgData.data[j * width + i + 1]) > 10 ||
						Math.abs(tdBorderColor[2] - imgData.data[j * width + i + 2]) > 10) {
						return [i - x, j - y];
					}
				}
			}

			var tdBorderColor = [imgData.data[y * width + x], imgData.data[y * width + x + 1], imgData.data[y * width + x + 2]];
			var tdBorderWidth = getBorderWidth();

			var tdBorderLeftWidth = tdBorderWidth[0];
			var tdBorderTopWidth = tdBorderWidth[1];
			var tdBackground = [imgData.data[(y + tdBorderTopWidth) * width + x + tdBorderLeftWidth], imgData.data[(y +
					tdBorderTopWidth) * width + x + tdBorderLeftWidth + 1],
				imgData.data[(y + tdBorderTopWidth) * width + x + tdBorderLeftWidth + 2]
			];
			var tdWidth = getWidth();
			var tdHeight = getHeight();

			return {
				height: tdHeight,
				width: tdWidth,
				background: tdBackground,
				borderColor: tdBorderColor,
				borderWidth: tdBorderWidth
			};
		}

		var findLeft = function() {
			var h = parseInt(height / 2) * width;
			for (var j = 0; j < width; j += 4) {
				if (bgColor[0] != imgData.data[h + j] || bgColor[1] != imgData.data[h + j + 1] || bgColor[2] != imgData.data[
						h + j + 2]) {
					return j;
				}
			}
		}
		var findRight = function() {
			var h = parseInt(height / 2) * width;
			for (var j = width - 1; j > 4; j -= 4) {
				if (bgColor[0] != imgData.data[h + j - 3] || bgColor[1] != imgData.data[h + j - 2] || bgColor[0] != imgData.data[
						h + j - 1]) {
					return j - 3;
				}
			}
		}
		var findTop = function() {
			var w = parseInt(imgData.width / 2) * 4;
			for (var j = 0; j < height; j++) {
				if (bgColor[0] != imgData.data[j * width + w] || bgColor[1] != imgData.data[j * width + w + 1] ||
					bgColor[2] != imgData.data[
						j * width + w + 2]) {
					return j;
				}
			}
		}
		var findBottom = function() {
			var w = parseInt(imgData.width / 2) * 4;
			for (var j = height - 1; j > 0; j--) {
				if (bgColor[0] != imgData.data[j * width + w] || bgColor[1] != imgData.data[j * width + w + 1] ||
					bgColor[2] != imgData.data[
						j * width + w + 2]) {
					return j;
				}
			}
		}
		var findNextStart = function(y, x, color) {
			for (var i = x; i < right; i += 4) {
				if (color[0] == imgData.data[y * width + i] && color[1] == imgData.data[y * width + i + 1] && color[2] ==
					imgData.data[y * width + i + 2]) {
					return i + 4;
				}
			}
		}

		var getTrWidth = function(tds) {
			var w = 0;
			for (var i = 0; i < tds.length; i++) {
				w += tds[i].width;
			}
			return w;
		}

		left = findLeft();
		top = findTop();
		right = findRight();
		bottom = findBottom();
		var arrtds = new Array();
		var arrtrs = new Array();
		var x = left,
			y = top;
		var tagArr = new Array();
		var miniW = right / 4 - left / 4;
		miniH = bottom - top;
		var maxCols = 0;
		while (true) {
			var td = getTd(x, y);
			if (td.width < miniW) {
				miniW = td.width;
			}
			if (td.height < miniH) {
				miniH = td.height;
			}
			tagArr.push({
				x: x,
				y: y + td.height + td.borderWidth[1]
			});
			arrtds.push(td);
			if (parseInt(x + td.width * 4) >= right && parseInt(y + td.height + td.borderWidth[1]) >= bottom) {
				arrtrs.push(JSON.parse(JSON.stringify(arrtds)));
				if (arrtds.length > maxCols) {
					maxCols = arrtds.length;
				}
				arrtds.splice(0, arrtds.length);
				break;
			} else if (x + td.width * 4 >= right) {
				var mini;
				if (tagArr.length > 0) {
					var tg = 0;
					mini = tagArr[0];
					for (var i = 1; i < tagArr.length; i++) {
						if (tagArr[i].y < mini.y) {
							mini = tagArr[i];
							tg = i;
						}
					}
					tagArr.splice(tg, tagArr.length);
					x = mini.x;
					y = mini.y;
				}
				arrtrs.push(JSON.parse(JSON.stringify(arrtds)));
				if (arrtds.length > maxCols) {
					maxCols = arrtds.length;
				}
				arrtds.splice(0, arrtds.length);
			} else if (imgData.data[x + td.width * 4 + td.borderWidth[0] + y * width] != td.borderColor[0] &&
				imgData.data[x + td.width * 4 + td.borderWidth[0] + y * width + 1] != td.borderColor[1] &&
				imgData.data[x + td.width * 4 + td.borderWidth[0] + y * width + 1] != td.borderColor[2]) {
				x = findNextStart(y, x + td.borderWidth[0] + td.width * 4, td.borderColor);
			} else {
				x = x + td.width * 4;
			}
		}

		function rgb2Hex(rgb) {
			var r = parseInt(rgb[0]);
			var g = parseInt(rgb[1]);
			var b = parseInt(rgb[2]);

			var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
			return hex;
		}



		if (arrtrs.length > 0 && arrtrs[0].length > 0) {
			var style = TableBuilder.style.innerText.replace('border:' + TableBuilder.borderWidth + 'px solid ' +
				TableBuilder
				.borderColor + ';', 'AASD');
			TableBuilder.borderColor = rgb2Hex(arrtrs[0][0].borderColor);
			TableBuilder.borderWidth = arrtrs[0][0].borderWidth[1];
			style = style.replace('AASD', 'border:' + TableBuilder.borderWidth + 'px solid ' + TableBuilder.borderColor +
				';');
			TableBuilder.style.innerText = style;
		}

		var trs = new Array();
		var tableWidth = right / 4 - left / 4;
		var tableH = bottom - top;

		function getRows(x, cols, rows) {
			for (var i = x + 1; i < arrtrs.length && (i - x < rows); i++) {
				var tableW = getTrWidth(arrtrs[i]);
				var tdCol = parseInt(tableW / tableWidth * maxCols);
				if (cols + tdCol > maxCols) {
					return i - x;
				}
			}
			return rows;
		}

		for (var i = 0; i < arrtrs.length; i++) {
			var tds = new Array();
			var tableW = getTrWidth(arrtrs[i]);
			var tdCol = parseInt(tableW / tableWidth * maxCols);
			for (var j = 0; j < arrtrs[i].length; j++) {
				var td = {};
				td.width = arrtrs[i][j].width;
				td.height = arrtrs[i][j].height;
				td.padding = '0px 0px';
				td.html = '';
				td.fontSize = '16px';
				td.textColor = '#333';
				td.bgColor = rgb2Hex(arrtrs[i][j].background);
				td.borderColor = rgb2Hex(arrtrs[i][j].borderColor);
				td.borderWidth = arrtrs[i][j].borderWidth[1];


				var colspan = Math.round(arrtrs[i][j].width / tableW * tdCol);
				tableW -= arrtrs[i][j].width;
				tdCol -= colspan;
				if (colspan == 0) {
					colspan = 1;
				}

				var rowspan;
				if (arrtrs[i].length == 1) {
					rowspan = 1;
				} else {
					rowspan = Math.round(arrtrs[i][j].height / tableH * arrtrs.length);
					if (rowspan > 1) {
						rowspan = getRows(i, colspan, rowspan);
					}
				}
				if (rowspan == 0) {
					rowspan = 1;
				}

				td.rowspan = rowspan;
				td.colspan = colspan;

				tds.push(td);
			}
			trs.push(tds);
		}

		TableBuilder.trs = trs;
		TableBuilder.loadData(TableBuilder.trs);
		return imgData;
	}
}
