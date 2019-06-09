//对话框
var HgDialog = {
	id: 'hg-dialog',
	ele: undefined,
	userHtml: '',
	model: undefined,
	modelClose: undefined,
	config: {
		type: 'show', //弹出框类型  show/line-input/lines-input
		closeStyle: 'normal', //按钮风格   normal/bottom/button
		outerHide: 'true', //点击外部关闭
		width: '0', //宽度
		height: '0', //高度
		title: '', //标题
		hideText: '', //提示内容
		showText: '', //详细
		okOnclik: undefined, //确认按钮事件
		cancelOnclik: undefined, //取消按钮事件
		okText: '确定', //确定按钮文字
		cancelText: '取消' //取消按钮文字
	},
	init: function(data) {
		this.userHtml = ''
		this.id = data.id;
		if(this.ele==undefined){
			this.ele = document.getElementById(this.id);
		}else{
			this.ele.innerHTML='';
		}
		
		//灰度层样式
		this.ele.style.zIndex = '9999999';
		this.ele.style.height = '100%';
		this.ele.style.width = '100%';
		this.ele.style.background = 'rgba(0, 0, 0, 0.5)';
		this.ele.style.position = 'fixed';
		this.ele.style.left = '0';
		this.ele.style.top = '0';
		//样式-end
		HgDialog.ele.style.display = 'none';
		if (this.ele.childNodes.length > 0) {
			this.userHtml = this.ele.innerHTML;
		}
		if (data.closeStyle != undefined) {
			this.config.closeStyle = data.closeStyle;
		}
		if (data.outerHide != undefined) {
			this.config.outerHide = data.outerHide;
		}
		if (data.width != undefined) {
			this.config.width = data.width;
		}
		if (data.height != undefined) {
			this.config.height = data.height;
		}
		if (data.title != undefined) {
			this.config.title = data.title;
		}
		if (data.showText != undefined) {
			this.config.showText = data.showText;
		}
		if (data.okOnclik != undefined) {
			this.config.okOnclik = data.okOnclik;
		}
		if (data.cancelOnclik != undefined) {
			this.config.cancelOnclik = data.cancelOnclik;
		}
		if (data.okText != undefined) {
			this.config.okText = data.okText;
		}
		if (data.cancelText != undefined) {
			this.config.cancelText = data.cancelText;
		}
		if (data.type != undefined) {
			this.config.type = data.type;
		}
		if (data.hideText != undefined) {
			this.config.hideText = data.hideText;
		}
		initModel(data);
	},
	show: function() {
		HgDialog.ele.style.opacity = 0;
		this.ele.style.display = '';
		this.model.style.marginTop = -this.model.clientHeight / 2 + 'px';
		this.model.style.marginLeft = -this.model.clientWidth / 2 + 'px';

		this.model.style.marginTop = -this.model.clientHeight / 2 + 'px';
		this.model.style.marginLeft = -this.model.clientWidth / 2 + 'px';
		if (this.modelClose != undefined) {
			switch (this.config.closeStyle) {
				case 'normal':
					this.modelClose.style.left = this.model.clientWidth - 20 + 'px';
					this.modelClose.style.top = '-10px';
					break;
				case 'bottom':
					this.modelClose.style.left = this.model.clientWidth / 2 - 15 + "px";
					this.modelClose.style.top = this.model.clientHeight + 30 + 'px';
					break;
			}
		}
		for (var i = 0; i < 10; i++) {
			setTimeout((function(pos) {
				return function() {
					opacityAnimation(pos);
				}
			})(i / 10), i * 30)
		}
	},
	hide: function() {
		for (var i = 0; i < 10; i++) {
			setTimeout((function(pos) {
				return function() {
					if (pos >= 0.9) {
						HgDialog.ele.style.display = 'none';
						opacityAnimation(0);
					} else {
						opacityAnimation(1 - pos);
					}
				}
			})(i / 10), i * 20)
		}
	}
}
//通知
var HgNotic = {
	rootEle: undefined, //根元素
	num: 0, //信息数量
	width: '200px', //信息数量
	time: 0, //停留时间
	style: 'normal', //风格
	titleColor: '#5a5a5a', //标题颜色
	showTextColor: '#5a5a5a', //内容颜色
	background: '#fff', //背景颜色
	closeColor: '#8a8a8a', //关闭按钮颜色
	onClose: undefined, //关闭事件
	onClick: undefined, //点击事件
	onRemove: false, //是否删除全部中
	init: function(data) {
		if (data.style != undefined) {
			this.style = data.style;
		}
		if (data.time != undefined) {
			this.time = data.time;
		}
		if (data.titleColor != undefined) {
			this.titleColor = data.titleColor;
		}
		if (data.showTextColor != undefined) {
			this.showTextColor = data.showTextColor;
		}
		if (data.background != undefined) {
			this.background = data.background;
		}
		if (data.closeColor != undefined) {
			this.closeColor = data.closeColor;
		}
		if (data.onClose != undefined) {
			this.onClose = data.onClose;
		}
		if (data.onClick != undefined) {
			this.onClick = data.onClick;
		}
		if (data.width != undefined) {
			this.width = data.width;
		}

		if (this.rootEle == undefined) {
			this.rootEle = document.createElement("div");
			this.rootEle.style.position = 'fixed';
			this.rootEle.style.right = '30px';
			this.rootEle.style.top = '10px';
			this.rootEle.setAttribute('class', 'hg-notic');
			document.getElementsByTagName('body')[0].appendChild(this.rootEle);
		}
	},
	show: function(title, detail, footer) {
		if (this.rootEle == undefined) return;
		noticShow(title, detail, footer);
	},
	removeAll: function() {
		if (this.onRemove) return;
		var notics = new Array();;
		var t = HgNotic.time;
		var x = HgNotic.num - 1;
		if (x == -1) return;
		this.onRemove = true;
		for (var i = 0; i < HgNotic.rootEle.children.length; i++) {
			notics.push(HgNotic.rootEle.children[i]);
		}
		if (t == 0) {
			t = 300;
		} else {
			t = t / 10;
		}

		function doRemove(x, t) {
			setTimeout(function() {
				HgNotic.remove(notics[x]);
				if (x == 0) {
					HgNotic.onRemove = false;
				} else {
					doRemove(x - 1, t);
				}
			}, t);
		}
		doRemove(x, t);
	},
	remove: function(notic) {
		for (var i = 0; i < 10; i++) {
			setTimeout((function(pos) {
				return function() {
					try {
						if (pos >= 0.9) {
							notic.style.opacity = 0;
							HgNotic.rootEle.removeChild(notic);
							HgNotic.num--;
						} else {
							notic.style.opacity = 1 - pos;
						}
					} catch (e) {
						//TODO handle the exception
					}

				}
			})(i / 10), i * 50)
		}
	}

}

//渐变动画
function opacityAnimation(args) {
	HgDialog.ele.style.opacity = args;
}

//初始化弹出层内容
var initModel = function(data) {
	switch (data.style) {
		case '':
		case 'c':
		case undefined:
			initCenter();
			break;
	}

	function initCenter() {
		var model = document.createElement("div");
		model.setAttribute("class", "hg-dialog-model");
		HgDialog.model = model;
		var html = document.createElement("div");
		var detail = undefined;
		model.style.position = 'absolute';
		model.style.top = '50%';
		model.style.left = '50%';
		if (HgDialog.config.height != 0) {
			model.style.height = HgDialog.config.height + 'px';
		}
		if (HgDialog.config.width != 0) {
			model.style.width = HgDialog.config.width + 'px';
		}

		model.style.background = '#fff';
		model.style.boxShadow = '0px 0px 20px #909090';
		model.style.borderRadius = '6px';
		model.style.padding = '10px';

		html.style.width = '100%';
		html.style.height = '100%';
		html.style.whiteSpace = 'normal';
		html.style.wordWrap = 'break-word';
		html.style.overflowY = 'auto';
		html.style.display = 'flex';
		html.style.flexDirection = 'column';

		if (HgDialog.userHtml != '' && HgDialog.showText == '') {
			HgDialog.ele.innerHTML = "";
			html.innerHTML = HgDialog.userHtml;
			model.appendChild(html);
		} else {
			if (HgDialog.config.type == 'line-input') {
				detail = document.createElement("input");
				detail.placeholder = HgDialog.config.hideText;
				detail.value = HgDialog.config.showText;
				detail.style.textAlign = 'left';
				detail.style.padding = '5px';
			} else if (HgDialog.config.type == 'lines-input') {
				detail = document.createElement("textarea");
				detail.style.textAlign = 'left';
				detail.style.padding = '5px';
				detail.placeholder = HgDialog.config.hideText;
				detail.value = HgDialog.config.showText;
			} else {
				detail = document.createElement("div");
				detail.style.textAlign = 'center';
				detail.style.marginBottom = '10px';
				detail.innerHTML = HgDialog.config.showText;
			}
			detail.style.flex = '1';
			detail.style.fontSize = '16px';
			detail.style.color = 'rgb(74, 74, 74)';
		}
		if (HgDialog.config.title != '') {
			var title = document.createElement("div");
			title.style.width = '100%';
			title.style.marginBottom = '20px';
			title.style.textAlign = 'center';
			title.style.fontSize = '17px';
			title.innerHTML = HgDialog.config.title;
			title.style.color = 'rgb(33,33,33)';
			html.appendChild(title);
		}
		if (HgDialog.config.closeStyle == 'button' || HgDialog.config.type == 'line-input' || HgDialog.config.type ==
			'lines-input') {
			var buttonParent = document.createElement("div");
			var okLabel = document.createElement("label");
			var cancelLable = document.createElement("label");

			buttonParent.style.width = '100%';
			buttonParent.style.bottom = '0';
			buttonParent.style.left = '0';
			buttonParent.style.textAlign = 'right';
			buttonParent.style.marginTop = '10px';

			okLabel.style.margin = '10px';
			okLabel.innerHTML = HgDialog.config.okText;
			okLabel.style.textAlign = 'center';
			okLabel.style.cursor = 'pointer';
			okLabel.style.color = 'rgb(152, 152, 152)';
			okLabel.addEventListener("mouseover", function() {
				okLabel.style.color = 'rgb(74, 74, 74)';
			}, false);
			okLabel.addEventListener("mouseout", function() {
				okLabel.style.color = 'rgb(152, 152, 152)';
			}, false);
			okLabel.addEventListener("click", function() {
				try {
					if (typeof HgDialog.config.okOnclik === "function") { //是函数    其中 FunName 为函数名称
						if (HgDialog.config.type == 'show') {
							HgDialog.config.okOnclik(detail.innerHTML);
						} else {
							HgDialog.config.okOnclik(detail.value);
						}

					} else {
						HgDialog.hide();
					}
				} catch (e) {}
			}, false);
			cancelLable.style.margin = '10px';
			cancelLable.innerHTML = HgDialog.config.cancelText;
			cancelLable.style.textAlign = 'center';
			cancelLable.style.cursor = 'pointer';
			cancelLable.style.color = 'rgb(152, 152, 152)';
			cancelLable.addEventListener("mouseover", function() {
				cancelLable.style.color = 'rgb(74, 74, 74)';
			}, false);
			cancelLable.addEventListener("mouseout", function() {
				cancelLable.style.color = 'rgb(152, 152, 152)';
			}, false);
			cancelLable.addEventListener("click", function() {
				try {
					if (typeof HgDialog.config.cancelOnclik === "function") { //是函数    其中 FunName 为函数名称
						HgDialog.config.cancelOnclik();
					} else {
						HgDialog.hide();
					}
				} catch (e) {}
			}, false);

			buttonParent.appendChild(cancelLable);
			buttonParent.appendChild(okLabel);
			html.appendChild(detail);

			html.appendChild(buttonParent);

			model.appendChild(html);
		} else if (HgDialog.config.closeStyle != 'none') {
			var modelClose = document.createElement("div");
			HgDialog.modelClose = modelClose;
			modelClose.setAttribute("class", "hg-dialog-modelclose");
			var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			modelClose.style.position = 'absolute';
			modelClose.style.width = '30px';
			modelClose.style.height = '30px';
			modelClose.style.background = '#fff';
			modelClose.style.borderRadius = '30px';
			modelClose.style.textAlign = 'center';
			modelClose.style.cursor = 'pointer';

			svg.style.cursor = 'pointer';
			svg.style.margin = '2px';
			svg.style.width = '26px';
			svg.style.height = '26px';
			svg.style.overflow = 'hidden';
			svg.setAttribute('viewBox', "0 0 1024 1024");
			path.setAttribute("d",
				"M512 426.45429624L683.09140753 255.3628887c24.44162965-24.44162965 61.10407412-24.44162965 85.54570377 0s24.44162965 61.10407412 0 85.54570377L597.54570376 512l171.09140754 171.09140753c24.44162965 24.44162965 24.44162965 61.10407412 0 85.54570377s-61.10407412 24.44162965-85.54570377 0L512 597.54570376 340.90859247 768.6371113c-24.44162965 24.44162965-61.10407412 24.44162965-85.54570377 0-24.44162965-24.44162965-24.44162965-61.10407412 0-85.54570377L426.45429624 512 255.3628887 340.90859247C230.92125905 316.46696281 230.92125905 279.80451835 255.3628887 255.3628887c24.44162965-24.44162965 61.10407412-24.44162965 85.54570377 0L512 426.45429624z"
			);
			path.setAttribute('fill', "#8a8a8a");

			svg.appendChild(path);
			modelClose.appendChild(svg);
			model.appendChild(modelClose);
			modelClose.onclick = function() {
				HgDialog.hide();
			};
			html.appendChild(detail);
			model.appendChild(html);
		}

		if (HgDialog.config.outerHide == 'true') {
			HgDialog.ele.onclick = function() {
				HgDialog.hide();
			};
			//阻止冒泡
			model.onclick = function(ev) {
				var oEvent = ev || event;
				oEvent.cancelBubble = true;
				oEvent.stopPropagation();
				return false;
			}
		}
		HgDialog.ele.appendChild(model);

	}
}
//显示 notic
var noticShow = function(title, detail, footer) {
	var notic = document.createElement("div");
	var content = document.createElement("div");

	var modelClose = document.createElement("div");
	var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

	notic.setAttribute('class', 'notic');
	notic.style.position = 'relative';
	notic.style.boxShadow = '0px 0px 10px #9f9f9f';
	notic.style.marginTop = '20px';
	notic.style.width = HgNotic.width;
	notic.style.background = HgNotic.background;
	notic.style.borderRadius = '5px';

	//关闭按钮
	modelClose.setAttribute("class", "hg-notic-close");
	modelClose.style.position = 'absolute';
	modelClose.style.lineHeight = '26px';
	modelClose.style.width = '26px';
	modelClose.style.height = '26px';
	modelClose.style.background = '#fff';
	modelClose.style.borderRadius = '26px';
	modelClose.style.textAlign = 'center';
	modelClose.style.boxShadow = '0px 0px 10px #9f9f9f';
	modelClose.style.right = '-10px';
	modelClose.style.top = '-10px';
	modelClose.style.cursor = 'pointer';

	svg.style.cursor = 'pointer';
	svg.style.margin = '3px';
	svg.style.width = '20px';
	svg.style.height = '20px';
	svg.style.overflow = 'hidden';
	svg.setAttribute('viewBox', "0 0 1024 1024");
	path.setAttribute("d",
		"M512 426.45429624L683.09140753 255.3628887c24.44162965-24.44162965 61.10407412-24.44162965 85.54570377 0s24.44162965 61.10407412 0 85.54570377L597.54570376 512l171.09140754 171.09140753c24.44162965 24.44162965 24.44162965 61.10407412 0 85.54570377s-61.10407412 24.44162965-85.54570377 0L512 597.54570376 340.90859247 768.6371113c-24.44162965 24.44162965-61.10407412 24.44162965-85.54570377 0-24.44162965-24.44162965-24.44162965-61.10407412 0-85.54570377L426.45429624 512 255.3628887 340.90859247C230.92125905 316.46696281 230.92125905 279.80451835 255.3628887 255.3628887c24.44162965-24.44162965 61.10407412-24.44162965 85.54570377 0L512 426.45429624z"
	);
	path.setAttribute('fill', HgNotic.closeColor);

	svg.appendChild(path);
	modelClose.appendChild(svg);
	//关闭按钮-end

	//内容
	content.style.width = '100%';
	content.style.height = '100%';
	//content.style.position = 'absolute';
	content.style.top = '0';
	content.style.display = 'flex';
	content.style.flexDirection = 'column';
	content.setAttribute('class', 'content');
	content.style.cursor = 'pointer';
	var detailDiv = document.createElement("div");

	if (title != '' && title != null) {
		var titleDiv = document.createElement("div");
		titleDiv.style.padding = '5px 10px';
		titleDiv.style.color = HgNotic.titleColor;
		titleDiv.innerHTML = title;
		titleDiv.style.cursor = 'pointer';
		content.appendChild(titleDiv);
	}
	detailDiv.style.wordWrap = 'break-word';
	detailDiv.style.fontSize = '0.875rem';
	detailDiv.style.padding = '3px 10px';
	detailDiv.style.marginBottom = '5px';
	detailDiv.style.flex = '1';
	detailDiv.style.color = HgNotic.showTextColor;
	detailDiv.innerHTML = detail;
	detailDiv.style.cursor = 'pointer';
	content.appendChild(detailDiv);
	if (footer != '' && footer != null) {
		var dateDiv = document.createElement("div");
		dateDiv.style.padding = '0px 10px';
		dateDiv.style.marginBottom = '5px';
		dateDiv.style.fontSize = '0.6875rem';
		dateDiv.style.color = '#8a8a8a';
		dateDiv.innerHTML = footer;
		dateDiv.style.cursor = 'pointer';
		content.appendChild(dateDiv);
	}
	content.addEventListener("click", function() {
		try {
			if (typeof HgNotic.onClick === "function") { //是函数    其中 FunName 为函数名称
				HgNotic.onClick({
					ele: notic,
					title: title,
					detail: detail,
					footer: footer
				});
			}
		} catch (e) {}
	}, false);
	//内容-end
	notic.appendChild(content);
	notic.appendChild(modelClose);
	modelClose.onclick = function() {
		HgNotic.rootEle.removeChild(this.parentNode);
		HgNotic.num--;
		try {
			if (typeof HgNotic.onClose === "function") { //是函数    其中 FunName 为函数名称
				HgNotic.onClose();
			}
		} catch (e) {}
	};

	if (HgNotic.num == 0) {
		HgNotic.rootEle.appendChild(notic);
	} else {
		HgNotic.rootEle.insertBefore(notic, HgNotic.rootEle.childNodes[0]);
	}
	HgNotic.num++;
	if (HgNotic.num > 0 && HgNotic.time != 0) {
		setTimeout(function() {
			for (var i = 0; i < 10; i++) {
				setTimeout((function(pos) {
					return function() {
						try {
							if (!HgNotic.onRemove) {
								if (pos >= 0.9) {
									notic.style.opacity = 0;
									HgNotic.rootEle.removeChild(notic);
								} else {
									notic.style.opacity = 1 - pos;
								}
							}
						} catch (e) {
							//TODO handle the exception
						}

					}
				})(i / 10), i * 100)
			}
		}, HgNotic.time);

	}
}
