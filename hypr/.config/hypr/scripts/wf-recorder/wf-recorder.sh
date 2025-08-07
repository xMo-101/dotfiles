#!/bin/bash

PIDFILE="/tmp/wf-recorder.pid"
OUT="$HOME/recording-$(date +%F-%T).mp4"

if [ -f "$PIDFILE" ]; then
    kill "$(cat $PIDFILE)"
    rm "$PIDFILE"
    notify-send "Recording stopped"
else
    wf-recorder -f "$OUT" &
    echo $! > "$PIDFILE"
    notify-send "Recording started"
fi
