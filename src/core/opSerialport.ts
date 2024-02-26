import { SerialPort, SerialPortOpenOptions } from "serialport";
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
			console.log(e); 
			CF_COM = e[0].label
			quickPick.dispose()
		})
		quickPick.onDidHide(() => quickPick.dispose())
		quickPick.show()
  },

  listenSp: async () => {
    let portInfo = await SerialPort.list();

    // 后更改，只保留创趣相关
    portInfo = portInfo.filter(v => v)
    console.log(portInfo)

    let portList = portInfo.map(v => v.path)
    console.log(portList)
    if (CF_COM) {
			if (portList.indexOf(CF_COM) >= 0) {
				const sp = new SerialPort({path: CF_COM, baudRate: CF_BAUDRATE})
			} else {vscode.window.showErrorMessage("设备已断开")}
		} else {vscode.window.showErrorMessage("请先连接串口")}
  }
}