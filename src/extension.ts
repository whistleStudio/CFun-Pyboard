import * as vscode from 'vscode';
import {exec} from "child_process"; 
import upToCF from './core/upToCF';
import opSerialport from './core/opSerialport';
import setupPyb from './core/setupPyb';
import { ExampleTreeDataProvider, openExampleDoc } from './core/exampleTreeDataProvider';
import { toc } from './examples/toc';

export function activate(context: vscode.ExtensionContext) {
	// 只执行一次, 默认安装相关py包 pip install ./src/pyblib/pyb-0.0.0-py3-none-any.whl
	setupPyb.installPyb(context)
	setupPyb.installTerminalS()
	
	/* 1. 安装pyb库 */
	const installPyb = vscode.commands.registerCommand("cfpyb.installPyb", () => {
		setupPyb.installPyb(context, true)
	})


	/* 2. 串口选择 */
	const selectSp = vscode.commands.registerCommand('cfpyb.selectSp', () => {
		opSerialport.selectSp()
	});

	/* 3. 在线调试 */
	const enterRepl = vscode.commands.registerCommand("cfpyb.enterRepl", async () => {
		opSerialport.enterRepl()
	})

	/* 4. 设备重启 */
	const reboot = vscode.commands.registerCommand("cfpyb.reboot", () => {
		// opSerialport.doAndReboot()
		opSerialport.reboot()
	})

	/* 5. 上传文件（并运行） */
	const uploadFile = vscode.commands.registerCommand("cfpyb.uploadFile", uri => {
		if (uri) upToCF.uploadFile(uri.path)
	})

	/* 6. 上传项目文件夹（并运行） */
	const uploadDir = vscode.commands.registerCommand("cfpyb.uploadProject", uri => {
		if (uri) upToCF.uploadProject(uri.path)
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

	/* 7. 打开接口文档 */
	const openApiDoc = vscode.commands.registerCommand("cfpyb.openApiDoc", () => {
		exec("start https://docs.micropython.org/en/latest/library/index.html")
	})
	
	/* 8. 侧边栏示例 */
	for (let i in toc) {
		vscode.window.registerTreeDataProvider(i, new ExampleTreeDataProvider(context, i))
	}

	

	/* 9. 打开示例 */
	vscode.commands.registerCommand("cfpyb.openExample", (item: vscode.TreeItem) => {
		openExampleDoc(item)
	} )

	context.subscriptions.push(selectSp, enterRepl, uploadFile, uploadDir, 
		openApiDoc, installPyb, reboot);
}



