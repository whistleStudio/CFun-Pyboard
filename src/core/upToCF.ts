import getTargetDrive from "./getTargetDrive";
import fs from "fs"
import * as vscode from 'vscode';
import path from "path";
import opSerialport from "./opSerialport";


const ignoreFiles = ["README.txt", "pybcdc.inf", "boot.py"]
const ignoreDir = ["picture"]

// 递归复制文件夹
function copyDir (cpPath: string, destPath: string) {
  const files = fs.readdirSync(cpPath) 
  files.forEach(v => {
    const curCp = path.resolve(cpPath, v)
    const curDest = path.resolve(destPath, v)
    fs.stat(curCp, (err, stats) => {
      if (!err) {
        // 复制文件
        if (stats.isFile()) {
          if (ignoreFiles.indexOf(v) < 0) fs.createReadStream(curCp).pipe(fs.createWriteStream(curDest));
        }
        // 复制目录 
        else if (stats.isDirectory()) {
          if (ignoreDir.indexOf(v) < 0) {
            fs.mkdirSync(curDest, {recursive: true})
            copyDir(curCp, curDest)
          }
        }
      }
    })
  })
}

export default {
  /* 上传文件 */
  uploadFile: async (curFileUri: string) => {
    if (opSerialport.get_CF_COM()) {
      curFileUri = curFileUri.slice(1)
      const targetDrive = await getTargetDrive("CFUNFLASH")
      if (!targetDrive) { vscode.window.showErrorMessage("未找到CFUNFLASH") }
      else {
        fs.readFile(curFileUri, (err, data) => {
          if (err) {
            vscode.window.showErrorMessage("文件读取失败") }
          else {
            fs.writeFile(`${targetDrive}:/main.py`, data, err => {
              if (err) { vscode.window.showErrorMessage("上传失败") } 
              else { 
                vscode.window.showInformationMessage("上传成功")
                opSerialport.reboot()
              }
            })     
          }
        })
      }
    } else { vscode.window.showErrorMessage("请先连接串口") }
  },
  /* 上传项目 */
  uploadProject: (curProjUri: string) => {
    if (opSerialport.get_CF_COM()) {
      curProjUri = curProjUri.slice(1)
      // 遍历目录，是否包含main.py
      fs.readdir(curProjUri, async (err, files) => {
        if (!err) {
          let flag = false
          files.forEach(v => {
            if (v == "main.py") flag = true
          })
          if (flag) {
            // 打开CF磁盘
            const targetDrive = await getTargetDrive("CFUNFLASH")
            if (targetDrive) {
              try {
                copyDir(curProjUri, `${targetDrive}:/`)
                vscode.window.showInformationMessage("上传成功")
                opSerialport.reboot()
              } catch(err) {console.log(err); vscode.window.showErrorMessage("上传失败")}
            } else vscode.window.showErrorMessage("未找到CFUNFLASH")
          } else vscode.window.showErrorMessage("项目根目录缺失文件: main.py") 
        } else vscode.window.showErrorMessage("项目读取失败")
      })
    } else { vscode.window.showErrorMessage("请先连接串口") }
  }

} 
