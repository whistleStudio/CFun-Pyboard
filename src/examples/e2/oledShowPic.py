""" 
板载屏显示连环画(需要预先在picture文件下准备相应图片, 可使用cfpyb插件图像处理功能)
"""

from pyb import OLED
from time import sleep

oled = OLED()

while True:
  # 6幅图片分别为p0-5
  for i in range(6):
    oled.clear()
    oled.displayPic(1, 1, "p" + str(i)) 
    sleep(1)