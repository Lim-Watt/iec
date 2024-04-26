/*///////////////////////////////////
 *
 * liser.js
 * 
 * 可以后台运行，用于接受连接
 * 
 * 运行过程
 * * 
 * * 启动程序，开始监听
 * * 
 * * 接受到申请
 * * 
 * * 分配端口
 * * 
 * * 打开 anser 交互端
 * * 
 * * 向申请方回复，内容：分配的端口
 * * 
 * 
/*///////////////////////////////////

/**
 * 重载 require
 * 
 * 很抽象哦，导入 json 要 "type": "module"
 * 然后它就不允许 require，
 * 
 */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/**
 * 导入配置文件
 */
import data from "../config.json" with { type : 'json' }

/**
 * 加载依赖
 */
const WebSocket = require('ws');
const { exec } = require('child_process')

/**
 * 监听 19198 端口
 * 
 * 在有申请时向下分配
 */
const port = 19198;

const wss = new WebSocket.Server({ port: port });

let cnt = 0;

const anser = data.anser;
const OS = data.OS;

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

wss.on('connection', async function(ws) {
	
	console.log("[link] 连接申请");
	
	++ cnt;
	
	if (OS == "linux")
	{
		exec(`gnome-terminal -- node --no-warnings=ExperimentalWarning ${anser} ${port - cnt}`, (err) => { });
	}
	else if (OS == "win")
	{
		exec(`start cmd /c node --no-warnings=ExperimentalWarning ${anser} ${port - cnt}`, (err) => { });
	}
	else
	{
		throw new Error('OS should be "linux" or "win"');
	}
	
	await sleep(1000);
	
	ws.send(port - cnt);
});