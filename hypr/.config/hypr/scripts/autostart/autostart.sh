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
if ags list > /dev/null
then
    ags quit
fi
ags run -g4 &
