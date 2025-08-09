#!/bin/bash
# swww
if pgrep -x "swww-daemon" > /dev/null
then
	swww kill
fi
swww-daemon &
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
# blueman:
if pgrep -x "blueman-applet" > /dev/null
then
    pkill blueman-applet
fi
blueman-applet &
# ags:
ags quit # no check because weird behaviour
ags run -g4 &
