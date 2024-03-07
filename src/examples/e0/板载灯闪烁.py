""" 
板载灯闪烁: 亮1秒, 灭1秒, 循环往复
"""

from pyb import RGBLED
from time import sleep

rgb = RGBLED()

while True:
    rgb.boardShow(100, 100, 100)
    sleep(1)
    rgb.boardShow(0, 0, 0)
    sleep(1)
