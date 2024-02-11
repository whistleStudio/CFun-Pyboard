import * as vscode from 'vscode';
import {exec} from "child_process"; 
import upToCF from './core/upToCF';
import getSerialport from './core/getSerialport';

let CF_COM: string | undefined

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "cfpy" is now active!');
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
	
	let disposable = vscode.commands.registerCommand('cfpy.helloWorld', async () => {
		vscode.window.showInformationMessage('Hello World from cfpy!');
		let portList = await getSerialport()
		const quickPick = vscode.window.createQuickPick()
		quickPick.items = portList.map(v=>({label: v}));
		quickPick.onDidChangeSelection(e => {
			console.log(e); 
			CF_COM = e[0].label
			quickPick.dispose()})
		quickPick.onDidHide(() => quickPick.dispose())
		quickPick.show()
	});

	const uploadFile = vscode.commands.registerCommand("cfpy.uploadFile", uri => {
		if (uri) {
			upToCF(uri.path)
		}
	})

	context.subscriptions.push(disposable, uploadFile);
}

export function deactivate() {}
