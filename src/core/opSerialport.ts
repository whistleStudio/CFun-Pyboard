import { SerialPort, SerialPortOpenOptions } from "serialport";
import {exec} from "child_process"; 
import * as vscode from "vscode"

let CF_COM = ""
const CF_BAUDRATE = 9600

export default {
  // 串口选择
  selectSp: async () => {
    const portInfo = await SerialPort.list();
    let portList = portInfo.filter(v => v).map(v => v.path)
    const quickPick = vscode.window.createQuickPick()
		quickPick.items = portList.map(v => ({label: v}));
		quickPick.onDidChangeSelection(e => {
			console.log("onDidChangeSelection", e); 
			CF_COM = e[0].label
      vscode.window.showInformationMessage("设备连接成功")
			quickPick.dispose()
		})
		quickPick.onDidHide(() => quickPick.dispose())
		quickPick.show()
  },
  // 串口监听
  listenSp: async () => {
    let portInfo = await SerialPort.list();

    //!!! 后更改，只保留创趣相关
    portInfo = portInfo.filter(v => v)
    console.log(portInfo)

    let portList = portInfo.map(v => v.path)
    console.log(portList)
    console.log("CF_COM", CF_COM)
    if (CF_COM) {
			if (portList.indexOf(CF_COM) >= 0) {
        vscode.window.showInformationMessage("开始监听")
        const ter = vscode.window.createTerminal(CF_COM)
        ter.show(true)
        ter.sendText(`terminal-s -p ${CF_COM} -b ${CF_BAUDRATE}`)
        setTimeout(()=>{
          ter.sendText(`\x03`)
        }, 2000)


				// const sp = new SerialPort({path: CF_COM, baudRate: CF_BAUDRATE}, err => {
        //   if (!err) {
              // sp.on('data', data => {
              //   let str = data.toString()
              //   // 非空格字符显示
              //   if(!(/^\s*$/.test(str))) {
              //     console.log('Data:', str)
              //     ter.sendText(str, false)
              //     // ter.
              //   }
              // })
              // sp.on("close", ()=>vscode.window.showErrorMessage("设备已断开"))
        //   }
        //   else {console.log(err); vscode.window.showErrorMessage("设备连接异常")}
        //   }
        // )
			} else {vscode.window.showErrorMessage("设备已断开")}
		} else {vscode.window.showErrorMessage("请先连接串口")}
  }
}