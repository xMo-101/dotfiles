#!/bin/bash
if pgrep -x "hyprsunset" > /dev/null; then
    pkill hyprsunset
else
    hyprsunset --temperature 4500 --gamma 80%
fi
