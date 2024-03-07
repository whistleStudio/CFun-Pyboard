"""
MP3播放音乐: 板载中键控制音乐播放
"""

from pyb import MP3Player, BoardKey

mp3, bdk = MP3Player(), BoardKey("center")

mp3.setVolume(32)
mp3.rootPlay(1)
while True:
  if bdk.value():
    while bdk.value():
      pass
    mp3.setPlayMode(1) #按一次播放，再按一次暂停