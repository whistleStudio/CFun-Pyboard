import * as vscode from 'vscode';
import {exec} from "child_process"; 
import upToCF from './core/upToCF';
import opSerialport from './core/opSerialport';
import setupPyb from './core/setupPyb';
import { ExampleTreeDataProvider, openExampleDoc } from './core/exampleTreeDataProvider';
import { toc } from './examples/toc';
import opPicture from './core/opPicture';

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

	/* 7. 打开接口文档 */
	const openApiDoc = vscode.commands.registerCommand("cfpyb.openApiDoc", () => {
		exec("start https://cfunworld.com/#/documents")
	})
	
	/* 8. 侧边栏示例 */
	for (let i in toc) {
		vscode.window.registerTreeDataProvider(i, new ExampleTreeDataProvider(context, i))
	}

	/* 9. 打开示例 */
	vscode.commands.registerCommand("cfpyb.openExample", (item: vscode.TreeItem) => {
		openExampleDoc(item)
	} )

	/* 10. 图片转化 */
	const opPic = vscode.commands.registerCommand("cfpyb.opPic", uri => {
		// console.log(uri)
		opPicture.toBmp(uri.path)
	} )	

	/* 11. 图片批量处理 */
	const opPicBatch = vscode.commands.registerCommand("cfpyb.opPicBatch", uri => {
		console.log("xxxxxxxxxxxx")
		opPicture.toBmpBatch(uri.path)
	})

	context.subscriptions.push(selectSp, enterRepl, uploadFile, uploadDir, 
		openApiDoc, installPyb, reboot, opPic, opPicBatch);
}



