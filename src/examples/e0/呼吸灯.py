""" 呼吸灯 """
from pyb import RGBLED
from time import sleep

rgb = RGBLED()
v = 0
step = 5
while True:
  if v > 100 or v < 0:
    step *= -1
  v += 5*step
  rgb.boardShow(v, 0, 0)
  sleep(0.1)