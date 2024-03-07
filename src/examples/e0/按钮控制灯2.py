'''
按钮控制灯2: 板载中键按一次, 红灯亮; 再按一次, 熄灭
'''

from pyb import RGBLED, BoardKey

rgb, bdk = RGBLED(), BoardKey("center")
flag = -1

while 1:
  if bdk.value():
    while bdk.value():
      pass
    flag *= -1
  if flag == 1:
    rgb.boardShow(100, 0, 0)
  else:
    rgb.boardShow(0, 0, 0)