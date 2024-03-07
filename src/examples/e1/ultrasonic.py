""" 
超声波预警
接线: P1-超声波测距传感器
功能: 检测距离小于10cm时, 亮红灯
"""

from pyb import Ultrasonic
from pyb import RGBLED

ult1 = Ultrasonic("A0")
RGBled = RGBLED()

while True:
  if (ult1.readDistance()) < 10:
    RGBled.boardShow(100,0,0)
  else:
    RGBled.boardShow(0,0,0)