import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import data from "../config.json" with { type : 'json' }
const WebSocket = require('ws');
const { exec } = require('child_process')

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