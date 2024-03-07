""" 
蜂鸣器发声 
接线: P1-有源蜂鸣器
功能: 中键按下时发声
"""

from pyb import Pin, BoardKey

buz = Pin("A0", Pin.OUT_PP)
bdk = BoardKey("center")

while True:
  if bdk.value():
    buz(True)
  else:
    buz(False)

