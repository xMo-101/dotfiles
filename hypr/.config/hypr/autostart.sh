#!/bin/bash
# hyprpaper
if pgrep -x "hyprpaper" > /dev/null
then
	pkill hyprpaper
fi
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
# nm-applet:
if pgrep -x "nm-applet" > /dev/null
then
    pkill nm-applet
fi
nm-applet &
# nwg-dock-hyprland:
if pgrep -x "nwg-dock-hyprla" > /dev/null
then
    pkill nwg-dock-hyprla
fi
nwg-dock-hyprland -d -f -lp 'end' -i 36 &
