'''
按钮控制灯: 板载中键按下时, 红灯亮; 松开时, 熄灭
'''

from pyb import RGBLED, BoardKey

rgb, bdk = RGBLED(), BoardKey("center")
while True:
  if bdk.value():
    rgb.boardShow(100, 0, 0)
  else: 
    rgb.boardShow(0, 0, 0)