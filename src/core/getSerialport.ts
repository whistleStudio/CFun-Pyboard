import { SerialPort } from "serialport";

export default async function () {
  const portInfo = await SerialPort.list();
  let portList = portInfo.filter(v => v).map(v => v.path)
  return portList
}