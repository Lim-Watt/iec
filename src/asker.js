import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import data from "../config.json" with { type : 'json' }
const WebSocket = require('ws');

const blessed = require('blessed');

const ip = process.argv[2];
const ask = new WebSocket(`ws://${ip}:19198`);
const myname = data.name;

console.log("[ask] 发送请求......");

ask.onopen = function ()
{
	console.log("[wait] 等待会话建立......");
}

ask.onmessage = function (message) {
	
	const port = message.data;
	
	let socket = new WebSocket(`ws://${ip}:${port}`);
	let screen;
	let box;
	let text;
	
	socket.onopen = function(e) {
		console.log("[open] 会话已建立");
		
		console.log("[build] 搭建会话框......");
		
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
		
		socket.send(`来自 ${myname} 的连接申请`);
	};
	
	function putmessage(message) {
		box.pushLine(message);
		box.pushLine('');
		box.scrollTo(box.getScrollHeight());
		screen.render();
	}
	
	socket.onmessage = function(event) {
		putmessage('    ' + event.data)
	};
	
	socket.onerror = function(error) {
		putmessage(`[error] ${error.message}`);
	};
	
	socket.onclose = function(error)
	{
		putmessage("[close] 连接中断");
	};
	
	process.on('exit', (e) => {
		socket.close();
	});
	
	ask.close();
}

ask.onerror = function(error) {
	console.log(`[error] 对方不在线`);
};