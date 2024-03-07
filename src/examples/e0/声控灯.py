""" 
声控灯
接线: P1-声音检测传感器
功能: 检测到声响时, 亮灯2秒后自动熄灭
"""

from pyb import Pin, RGBLED
from time import sleep

voice = Pin("A0", Pin.IN)
rgb = RGBLED()
threshold = 200

while True:
  if voice.value() > threshold:
    rgb.boardShow(100, 100, 100)
    sleep(2)
    rgb.boardShow(0, 0, 0)