import { exec } from "child_process";
import * as vscode from "vscode";

export default {
  /* 1. 安装pyb */
  installPyb: function (context: vscode.ExtensionContext, isForce = false) {
    let cmd = isForce
      ? `${context.extensionPath}/src/pyblib/pyb-0.0.0-py3-none-any.whl --force-reinstall`
      : `${context.extensionPath}/src/pyblib/pyb-0.0.0-py3-none-any.whl`;
    let hint = isForce ? `更新` : `安装`;
    exec(`python -m pip install ${cmd}`, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        vscode.window.showErrorMessage(`脚本运行错误: ${error.message}`);
        return;
      }

      // pip 的 WARNING 不一定是错误
      if (stderr && /error|failed/i.test(stderr)) {
        vscode.window.showErrorMessage(`pyb库${hint}失败\nstderr:${stderr}`);
        return;
      }

      if (/already\s+installed\s+with\s+the\s+same\s+version/i.test(stdout))
        return;

      console.log(stdout);
      if (/Successfully\s+installed\s+pyb/i.test(stdout)) {
        vscode.window.showInformationMessage(`pyb包${hint}成功`);
      } else {
        vscode.window.showWarningMessage(
          `pyb包${hint}可能未成功，请检查控制台输出`
        );
      }
    });
  },

  // !!! 细化已安装的状态
  /* 2. 安装terminal-s */
  installTerminalS: () => {
    exec("python -m pip install terminal-s", (error, stdout, stderr) => {
      const combinedOutput = stdout + stderr;

      if (error || /error|failed/i.test(combinedOutput)) {
        vscode.window.showErrorMessage(
          `repl调试工具安装失败\n${combinedOutput}`
        );
        return;
      }

      if (/Successfully\s*installed\s*terminal-s/i.test(combinedOutput)) {
        vscode.window.showInformationMessage("repl调试工具安装成功");
      }
    });
  },
  /* 3. 初始化安装两个包 */
  setup: function (context: vscode.ExtensionContext) {
    suggestInstallExt();
    this.installPyb(context);
    this.installTerminalS();
  },
};

// 建议安装
function suggestInstallExt() {
  console.log("suggestInstallExt");
  const regPython = /ms-python.python/,
    regPylance = /ms-python.vscode-pylance/;
  exec(
    "code --list-extensions",
    { shell: "powershell.exe" },
    (error, stdout, stderr) => {
      if (!error) {
        //  安装python插件，会自动安装pylance
        if (!regPython.test(stdout)) {
          vscode.window
            .showInformationMessage(
              "建议安装Microsoft Python扩展",
              "安装",
              "算了"
            )
            .then((select) => {
              if (select == "安装")
                exec("code --install-extension ms-python.python", {
                  shell: "powershell.exe",
                });
            });
        } else if (!regPylance.test(stdout)) {
          // 安装pylance插件
          vscode.window
            .showInformationMessage(
              "建议安装Microsoft Pylance扩展",
              "安装",
              "算了"
            )
            .then((select) => {
              if (select == "安装")
                exec(
                  "code --install-extension ms-python.vscode-pylance",
                  { shell: "powershell.exe" },
                  (error, stdout, stderr) => {
                    if (!error) {
                      if (/successfully.*installed/.test(stdout)) {
                        vscode.window.showInformationMessage(
                          "Pylance安装成功!  \n你可能需要重启vscode使其生效"
                        );
                      }
                    }
                  }
                );
            });
        }
      } else {
        console.log(error);
      }
    }
  );
}
