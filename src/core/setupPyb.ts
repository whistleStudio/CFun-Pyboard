import {exec} from "child_process"; 
import * as vscode from 'vscode';

export default {
  installPyb: function (context: vscode.ExtensionContext) {
    exec(`pip install ${context.extensionPath}/src/pyblib/pyb-0.0.0-py3-none-any.whl`, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        vscode.window.showErrorMessage('脚本运行错误')
        return;
      } else if(stderr) {
        vscode.window.showErrorMessage('pyb库安装失败')
        return;
      }
      else {
        const re = /Successfully\s*installed\s*pyb/
        console.log(stdout)
        if (re.test(stdout)) {
          vscode.window.showInformationMessage('pyb包安装成功')
        }
      }
      });
  },

  // !!! 细化已安装的状态
  installTerminalS: () => {
    exec("pip install terminal-s", (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        vscode.window.showErrorMessage('脚本运行错误')
        return;
      } else if(stderr) {
        vscode.window.showErrorMessage('repl调试工具安装失败')
        return;
      }
      else {
        const re = /Successfully\s*installed\s*terminal-s/
        console.log(stdout)
        if (re.test(stdout)) {
          vscode.window.showInformationMessage('repl调试工具安装成功')
        }
      }
    })
  }
}