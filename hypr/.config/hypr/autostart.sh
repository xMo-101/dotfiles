#!/bin/bash
# hyprpaper
hyprpaper &
# waybar:
if pgrep -x "waybar" > /dev/null
then
	pkill waybar
fi
waybar &
# hypridle:
hypridle &
# udiskie:
if pgrep -x "udiskie" > /dev/null
then
    pkill udiskie
fi
udiskie -t &
