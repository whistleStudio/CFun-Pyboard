import getTargetDrive from "./getTargetDrive";
import fs from "fs"
import * as vscode from 'vscode';

export default async function (currentFileUrl: string) {
  currentFileUrl = currentFileUrl.slice(1)
  const targetDrive = await getTargetDrive("CFUNFLASH")
  if (!targetDrive) { vscode.window.showErrorMessage("CFUNFLASH not found") }
  else {
    fs.readFile(currentFileUrl, (err, data) => {
      if (err) {
        vscode.window.showErrorMessage("file read fail") }
      else {
        fs.writeFile(`${targetDrive}:/main.py`, data, err => {
          if (err) { vscode.window.showErrorMessage("upload fail") } 
          else { vscode.window.showInformationMessage("upload success") }
        })     
      }
    })
  }
}