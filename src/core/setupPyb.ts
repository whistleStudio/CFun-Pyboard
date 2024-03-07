import {exec} from "child_process"; 
import * as vscode from 'vscode';

export default {
  /* 1. 安装pyb */
  installPyb: function (context: vscode.ExtensionContext, isForce = false) {
    let cmd = isForce ? `${context.extensionPath}/src/pyblib/pyb-0.0.0-py3-none-any.whl --force-reinstall` : `${context.extensionPath}/src/pyblib/pyb-0.0.0-py3-none-any.whl`
    let hint = isForce ? `更新` : `安装`
    exec(`pip3 install ${cmd}`, (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        vscode.window.showErrorMessage(`脚本运行错误\nerr:${error}`)
        return;
      } else if(stderr) {
        vscode.window.showErrorMessage(`pyb库${hint}失败\nstderr:${stderr}`)
        return;
      }
      else {
        const re = /Successfully\s*installed\s*pyb/
        console.log(stdout)
        if (re.test(stdout)) {
          vscode.window.showInformationMessage(`pyb包${hint}成功`)
        }
      }
      });
  },

  // !!! 细化已安装的状态
  /* 2. 安装terminal-s */
  installTerminalS: () => {
    exec("pip3 install terminal-s", (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        vscode.window.showErrorMessage(`脚本运行错误\nerr:${error}`)
        return;
      } else if(stderr) {
        vscode.window.showErrorMessage(`repl调试工具安装失败\nstderr:${stderr}`)
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