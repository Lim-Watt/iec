import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import data from "../config.json" with { type : 'json' }
const WebSocket = require('ws');
const { execSync } = require('child_process')

const port = 19198;

const wss = new WebSocket.Server({ port: port });

let cnt = 0;

const anser = data.anser;
const OS = data.OS;

wss.on('connection', ws => {
	
	console.log("[link] 连接申请");
	
	++ cnt;
	
	if (OS == "linux")
	{
		execSync(`gnome-terminal -- node --no-warnings=ExperimentalWarning ${anser} ${port - cnt}`, (err) => { });
		
		execSync(`sleep 1s`, (err) => { });
	}
	else if (OS == "win")
	{
		execSync(`cmd /K start node --no-warnings=ExperimentalWarning ${anser} ${port - cnt}`, (err) => { });
		
		execSync(`timeout /T 1 /NOBREAK`, (err) => { });
	}
	else
	{
		throw new Error('OS should be "linux" or "win"');
	}
	
	ws.send(port - cnt);
});