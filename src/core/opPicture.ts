import Jimp from "jimp";
import fs from "fs"
import bmp, { BitsPerPixel } from '@wokwi/bmp-ts';
import * as vscode from "vscode"
import path from "path";

export default {
  /* 1. 单个图像转化 */
  toBmp: (imgPath: string) => {
    imgPath = imgPath.slice(1)
    processSingleBmp(imgPath)
  },

  /* 2. 图像批量处理 */
  toBmpBatch: (dirPath: string) => {
    const reg = /.(png|jpeg|jpg)$/
    dirPath = dirPath.slice(1)
    const files = fs.readdirSync(dirPath)
    files.forEach(v => {
      const curCp = path.resolve(dirPath, v)
      // 处理picture根目录下图片
      fs.stat(curCp, (err, stats) => {
        if (!err) {
          if (stats.isFile() && reg.test(v)) {
            processSingleBmp(`${dirPath}/${v}`)
          }
        } else vscode.window.showErrorMessage("picture文件夹读取失败")
      })
    })
  }
}

// 单图读取处理
function processSingleBmp (imgPath: string) {
  Jimp.read(imgPath, (err, jimp) => {
    if (!err) {
      // 调整尺寸，反转适配oled
      jimp.cover(128, 64).invert()
      const bmpData = {
        data: jimp.bitmap.data, // Buffer
        bitPP: 1 as BitsPerPixel, // The number of bits per pixel
        width: 128, // Number
        height: 64 // Number
      }
      const rawData = bmp.encode(bmpData)
      const buf = reprocessBmp(Buffer.from(rawData.data))
      const pathInfo = getFileName(imgPath)
      if (pathInfo.dname && pathInfo.fname) {
        fs.writeFile(`${pathInfo.dname}${pathInfo.fname}.bmp`, buf, err => {
          if (err) vscode.window.showErrorMessage("图片处理失败")
        });
      } else vscode.window.showErrorMessage("图片名称解析失败")
    } else vscode.window.showErrorMessage("图片读取失败")
  })
}

// 图像再处理，以适配Oled
function reprocessBmp (buf: Buffer) {
  const L = 1086
  buf[2] = 62
  buf[3] = 4
  buf[34] = 0
  buf[38] = 116
  buf[39] = 18
  buf[42] = 116
  buf[43] = 18
  const dim = L - buf.length
  if (dim < 0) {
    buf = buf.subarray(0, dim)
  }
  return buf
}

// 文件名获取
function getFileName (rawStr: string) {
  const reg = /(.+\/picture\/)([0-9a-zA-Z_]{1,})\.(png|jpg|jpeg)$/
  const matchGroup = rawStr.match(reg) 
  const pathInfo = {
    fname: "",
    dname: ""
  }
  try {
    if (matchGroup?.length) {
      pathInfo.dname = matchGroup[1]
      pathInfo.fname = matchGroup[2]
    }
  } catch(err) {console.log(err)}
  return pathInfo
}


// for (let i = 1; i <=4; i++) {
//   const b = fs.readFileSync(`../../temp/p${i}.bmp`)
//   // console.log(JSON.stringify(b))
//   fs.writeFileSync(`../../temp/p${i}.txt`, JSON.stringify(b))
// }
// console.log("ok")

// const b1 = fs.readFileSync(`../../temp/cat1.bmp`)
// const b2 = fs.readFileSync(`../../temp/cat2.bmp`)

// b2[2] = 62
// b2[34] = 0
// b2[38] = 116
// b2[39] = 18
// b2[42] = 116
// b2[43] = 18
// b2[54] = 0, b2[55] = 0, b2[56] = 0
// b2[58] = 255, b2[59] = 255, b2[60] = 255
// let b3 = b2.slice(0, -2)
// console.log(b1.length, b2.length)
// // console.log(b1[b1.length-1], b2[b2.length-1])
// fs.writeFileSync('../../temp/cat3.bmp', b3);


// // console.log(JSON.stringify(b))
// fs.writeFileSync(`../../temp/cat3.txt`, JSON.stringify(b3))


