/*///////////////////////////////////
 *
 * anser.js
 * 
 * 用分配的端口搭建ws，并与连接上的 asker.js 交互
 * 
/*///////////////////////////////////

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import data from "../config.json" with { type : 'json' }
const WebSocket = require('ws');
const blessed = require('blessed');

console.log("[wait] 等待会话建立......");

const port = process.argv[2];
const wss = new WebSocket.Server({ port: port });

const myname = data.name;

let flag = false;

wss.on('connection', function connection(socket, req) {
	
	if (flag)
	{
		// 不知道有没有用
		throw new Error('另一个人在尝试连接！应急掐断会话。');
	}
	flag = true;
	
	console.log("[open] 会话已建立\n");
	
	console.log("[build] 搭建会话框......");
	
	let screen;
	let box;
	let text;
	
	// 会话框 build begin
		
	screen = blessed.screen({
		smartCSR: true,
		fullUnicode: true,
	});
	
	box = blessed.box({
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
	
	text = blessed.textbox({
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
	
	text.on('submit', function(content) {
		socket.send(myname + " : " + content);
		box.pushLine('    ' + myname + " : " + content);
		box.pushLine('');
		box.scrollTo(box.getScrollHeight());
		text.clearValue();
		text.focus();
		screen.render();
	});
	
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
		if (key.name === 'escape') {
			return;
		}
		
		text.focus();
	});
	
	screen.append(box);
	
	screen.append(text);
	
	text.focus();
	
	screen.render();
	
	// 会话框 build end
	
	function putmessage(message) {
		box.pushLine(message);
		box.pushLine('');
		box.scrollTo(box.getScrollHeight());
		screen.render();
	}
	
	putmessage(`[sys] 对方 IP : ${req.connection.remoteAddress}`);
	
	socket.on('message', message => {
		putmessage('    ' + message);
	});
	
	socket.onclose = (e) =>
	{
		putmessage("[close] 连接中断");
	}
	
	socket.send(`${myname} 已连接`);
});