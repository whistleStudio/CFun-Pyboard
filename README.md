# cfpyb插件 - 创趣智能硬件编程助手

## 介绍

> 为什么放弃图形化编程？天下苦无传参久矣，苦无列表字典久矣，苦无注释久矣，苦...

适配创趣天地智能主控、python编程实验箱等产品，提供强大的开发环境，主要特性如下:

- 基于创趣pyb的代码智能补全与语法检查
- 支持上传单个文件至主控板并软重启
- 支持上传项目文件夹至主控板并软重启
- 支持Repl在线交互式调试模式，串口调试器监控
- 提供指定目录下单个图片、多个图片批量转bmp格式功能
- 提供丰富的代码示例
- 参考文档快速链接

<br>

<br>

## 准备工作

**1）安装python3解释器或版本管理工具(如anaconda)**

python相关的系统环境配置就不赘述了，网上资料有很多

[官网地址] https://www.python.org/downloads/

[百度网盘python3.12.2]链接：https://pan.baidu.com/s/1hf7XskfIvzsR6qXwgv62vQ 提取码：qo2e 

<br>

**2)  安装vscode Python扩展并选择对应解释器**

<img src="https://whistlestudio-1300400818.cos.ap-nanjing.myqcloud.com/cfun/cfpyb-ext/readme/python%E6%8F%92%E4%BB%B6.png" alt="python插件" style="zoom: 80%;" />

<br>

**3）安装vscode Pylance扩展（安装Python扩展时会自动安装此项）**

开启类型检查功能，初次安装有时需要重启vscode才会生效

<img src="https://whistlestudio-1300400818.cos.ap-nanjing.myqcloud.com/cfun/cfpyb-ext/readme/pylance.gif"/>

<br>

**4）串口选择**

上传文件、上传项目、在线调试功能需先连接串口。

以智能控制器为例，打开设备并将其拨至离线下载档位；

使用数据线连接电脑后，在vscode中点击代码编辑区右上角串口选择图标选择相应串口

<img src="https://whistlestudio-1300400818.cos.ap-nanjing.myqcloud.com/cfun/cfpyb-ext/readme/串口选择.gif"/>

<br>

<br>

<br>

## 功能概述

### ✔️ 代码智能补全与语法检查

基于创趣pyb库的代码智能补全和语法检查，有助于开发者在编写代码的同时查看对应的API参数提示，借助Pylance等语法检查工具将收获更加严谨的编程体验。

<img src="https://whistlestudio-1300400818.cos.ap-nanjing.myqcloud.com/cfun/cfpyb-ext/readme/代码补全.gif"/>

<br>

<br>

### 📄 上传文件 - 单个python程序上传并软重启 [Ctrl+Alt+R]

串口已连接状态下，支持`任意文件名.py`文件上传至主控并立即执行程序。

<img src="https://whistlestudio-1300400818.cos.ap-nanjing.myqcloud.com/cfun/cfpyb-ext/readme/上传文件.gif"/>

<br>

<br>

### 📂 上传项目 - 整个项目文件夹上传并软重启

串口已连接状态下，支持根目录包含`main.py`（程序入口文件）的文件夹整体上传至主控并立即执行程序。

*注意：该上传过程中会自动忽略"README.txt", "pybcdc.inf", "boot.py"文件以及“.vscode”文件夹*

<img src="https://whistlestudio-1300400818.cos.ap-nanjing.myqcloud.com/cfun/cfpyb-ext/readme/上传项目.gif"/>

<br>

<br>

### 🔄 重置主控 

当编写`.py`文件时，可点击编辑区右上角重置主控图标，将设备内部存储还原至出厂状态

<img src="https://whistlestudio-1300400818.cos.ap-nanjing.myqcloud.com/cfun/cfpyb-ext/readme/%E4%B8%BB%E6%8E%A7%E9%87%8D%E7%BD%AE.png">

<br>

<br>

### 🗔  在线调试 - Repl交互调试模式

REPL (read-eval-print-loop)交互式调试。串口已连接状态下，当编写`.py`文件时，可点击编辑区右上角在线调试图标进入此模式，调试窗口输入语句，会立即执行得到反馈。

更多Repl模式操作参考：http://micropython.com.cn/en/latet/reference/repl.html

| 操作指令 | 执行结果                     |
| -------- | ---------------------------- |
| Ctrl+C   | 中断当前程序，重启Repl模式   |
| Ctrl+D   | 软重启主控，窗口打印串口数据 |
| Ctrl+]   | 退出Repl模式                 |

<img src="https://whistlestudio-1300400818.cos.ap-nanjing.myqcloud.com/cfun/cfpyb-ext/readme/repl.gif"/>

<br>

<br>

### 🖼️ 图片转化 - 单个图像文件转.bmp格式

支持picture文件夹下，单个任意尺寸`.jpg|.jpeg|.png`格式图像转128x64`.bmp`

### 🗃️ 图片批量处理 - 单个图像文件转.bmp格式

支持picture文件夹下，所有`.jpg|.jpeg|.png`格式图像转128x64`.bmp`

<img src="https://whistlestudio-1300400818.cos.ap-nanjing.myqcloud.com/cfun/cfpyb-ext/readme/图片处理.gif"/>

<br>

<br>

### 🌰 示例代码

提供经典硬件控制案例代码，帮助开发者快速入门(案例扩充中...)

<img src="https://whistlestudio-1300400818.cos.ap-nanjing.myqcloud.com/cfun/cfpyb-ext/readme/示例.gif"/>

<br>

<br>

### 🕮 文档说明

提供硬件模块参数功能详细说明 (api接口文档后续增加...)

<img src="https://whistlestudio-1300400818.cos.ap-nanjing.myqcloud.com/cfun/cfpyb-ext/readme/文档说明.gif"/>

<br>

<br>

### 😺 其他

Ctrl+Shift+P 输入指令

| 指令            | 功能                                                         |
| --------------- | ------------------------------------------------------------ |
| 初始化cfpyb扩展 | 手动初始化，如pyb库,  repl调试工具未安装，将尝试安装；注意初始化不会更新pyb库 |
| 更新pyb库       | 强制更新安装pyb库                                            |



<br>

<br>

## 联系与支持

如有使用疑问或技术交流，欢迎联系👇

作者: Whistle Wang

微信号: WhistleStudio

<img src="https://whistlestudio-1300400818.cos.ap-nanjing.myqcloud.com/cfun/cfpyb-ext/readme/whistleicon.png" style="float: left" />



