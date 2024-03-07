"""  
温湿度检测
接线: P1-温湿度传感器
功能: 板载屏幕分行显示
"""

from pyb import OLED, DHT11
from time import sleep

oled= OLED()
dht = DHT11("A0")

while True:
  oled.clear()
  oled.displayStr(1, 1, "big", "forward", "tem:" + str(dht.readTem()))
  oled.displayStr(17, 1, "big", "forward", "tem:" + str(dht.readHum()))
  sleep(1)