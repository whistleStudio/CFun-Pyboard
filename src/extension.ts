import * as vscode from 'vscode';
import {exec} from "child_process"; 
import upToCF from './core/upToCF';
import opSerialport from './core/opSerialport';
import setupPyb from './core/setupPyb';

export function activate(context: vscode.ExtensionContext) {
	// 只执行一次, 默认安装相关py包 pip install ./src/pyblib/pyb-0.0.0-py3-none-any.whl
	setupPyb.installPyb(context)
	
	// 安装pyb库
	const installPyb = vscode.commands.registerCommand("cfpyb.installPyb", () => {
		setupPyb.installPyb(context)
	})


	// 串口选择
	const selectSp = vscode.commands.registerCommand('cfpyb.selectSp', () => {
		opSerialport.selectSp()
	});

	// 串口监听
	const listenSp = vscode.commands.registerCommand("cfpyb.listenSp", async () => {
		opSerialport.listenSp()
	})

	// 离线上传文件
	const uploadFile = vscode.commands.registerCommand("cfpyb.uploadFile", uri => {
		if (uri) {
			upToCF.uploadFile(uri.path)
		}
	})

	// 离线上传项目文件夹
	const uploadDir = vscode.commands.registerCommand("cfpyb.uploadProject", uri => {
		upToCF.uploadProject(uri.path)
	})

	// 创建webview
	// const createWv = vscode.commands.registerCommand('cfpy.openWebview', uri => {
	// 	const panel = vscode.window.createWebviewPanel(
	// 		'testWebview', // viewType
	// 		"WebView演示", // 视图标题
	// 		vscode.ViewColumn.One, // 显示在编辑器的哪个部位
	// 		{
	// 			enableScripts: true, // 启用JS，默认禁用
	// 			retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
	// 		}
	// 	);
	// 	panel.webview.html = `<html><body>你好，我是Webview</body></html>`
	// })

	// 打开接口文档
	const openApiDoc = vscode.commands.registerCommand("cfpyb.openApiDoc", () => {
		exec("start https://docs.micropython.org/en/latest/library/index.html")
	})
	
	
	context.subscriptions.push(selectSp, listenSp, uploadFile, uploadDir, openApiDoc, installPyb);
}



