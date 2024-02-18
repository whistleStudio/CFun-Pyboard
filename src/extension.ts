import * as vscode from 'vscode';
import {exec} from "child_process"; 
import upToCF from './core/upToCF';
import getSerialport from './core/getSerialport';

let CF_COM: string | undefined

export function activate(context: vscode.ExtensionContext) {
	// 只执行一次, 默认安装相关py包
	exec('pip install numpy', (error, stdout, stderr) => {
		if (error) {
		  vscode.window.showErrorMessage('exec error')
		  return;
		} else if(stderr) {
			vscode.window.showErrorMessage('std error')
			return;
		}
		else {
			const re = /Successfully\s*installed\s*numpy/
			if (re.test(stdout)) {
				vscode.window.showInformationMessage('Successfully installed numpy')
			}
		}
	  });

	// 串口选择
	const getSp = vscode.commands.registerCommand('cfpy.helloWorld', async () => {
		vscode.window.showInformationMessage('Hello World from cfpy!');
		let portList = await getSerialport()
		const quickPick = vscode.window.createQuickPick()
		quickPick.items = portList.map(v => ({label: v}));
		quickPick.onDidChangeSelection(e => {
			console.log(e); 
			CF_COM = e[0].label
			quickPick.dispose()})
		quickPick.onDidHide(() => quickPick.dispose())
		quickPick.show()
	});

	// 离线上传文件
	const uploadFile = vscode.commands.registerCommand("cfpy.uploadFile", uri => {
		if (uri) {
			upToCF.uploadFile(uri.path)
		}
	})

	// 离线上传项目文件夹
	const uploadDir = vscode.commands.registerCommand("cfpy.uploadProject", uri => {
		upToCF.uploadProject(uri.path)
	})

	// 创建webview
	const createWv = vscode.commands.registerCommand('cfpy.openWebview', uri => {
		const panel = vscode.window.createWebviewPanel(
			'testWebview', // viewType
			"WebView演示", // 视图标题
			vscode.ViewColumn.One, // 显示在编辑器的哪个部位
			{
				enableScripts: true, // 启用JS，默认禁用
				retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
			}
		);
		panel.webview.html = `<html><body>你好，我是Webview</body></html>`
	})

	// 打开接口文档
	const openApiDoc = vscode.commands.registerCommand("cfpy.openApiDoc", () => {
		exec("start https://docs.micropython.org/en/latest/library/index.html")
	})
	
	
	context.subscriptions.push(getSp, uploadFile, uploadDir, createWv, openApiDoc);
}

