/**
 * 
 * gui.js
 * 
 * 纯交互界面脚本
 * 
 */

const blessed = require('blessed');

// 创建一个 blessed screen 对象
let screen = blessed.screen({
	smartCSR: true,
	fullUnicode: true,
});

// 创建一个 box 并设置一些属性
let box = blessed.box({
	top: 1,
	left: 'center',
	width: '100%',
	height: '100%-5',
	content: '',
	style: {
		//fg: 'white',
		//bg: 'black',
		//border: {
		//	fg: '#f0f0f0'
		//}
	},
	alwaysScroll: true,
	scrollable: true,
	scrollbar: { style: { bg: 'white' } }
});

// 将 box 添加到 screen 对象
screen.append(box);

// 创建一个 text 输入框
let text = blessed.textbox({
	bottom: 0,
	height: 3,
	inputOnFocus: true,
	padding: {
		top: 1,
		left: 2
	},
	style: {
		fg: '#787878',
		bg: '#454545',
		focus: {
			fg: '#f6f6f6',
			bg: '#353535'
		}
	}
});

// 将 text 输入框添加到 screen 对象
screen.append(text);

// 当用户在 text 输入框中按下回车键时，将输入的内容添加到 box 中
text.on('submit', function(content) {
	box.pushLine('    ' + content);
	box.pushLine('');
	//console.log(content);
	box.scrollTo(box.getScrollHeight());
	//box.scroll(100);
	text.clearValue();
	text.focus();
	screen.render();
});

// 让 text 输入框获取焦点
text.focus();

text.key(['up'], function (ch, key) {
	box.scroll(-3);
	screen.render();
});

text.key(['down'], function (ch, key) {
	box.scroll(3);
	screen.render();
});

screen.key(['escape'], function(ch, key) {
	return process.exit(0);
});

screen.on('keypress', function(ch, key) {
	// 如果按下的是 'escape' 键，那么不做任何事情
	if (key.name === 'escape') {
		return;
	}
	
	text.focus();
});

// 渲染 screen
screen.render();
