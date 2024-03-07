'''
随机七彩灯: 每隔2秒变一种颜色
'''

from pyb import RGBLED
import time, random

rgb = RGBLED()
c = [0]*3  # 创建一个长度3的列表
while True:
    # 分别获取红，绿，蓝三色的占空比
    for i in range(3):
        c[i] = random.randint(0, 100)
    rgb.boardShow(c[0], c[1], c[2])
    time.sleep(0.5)