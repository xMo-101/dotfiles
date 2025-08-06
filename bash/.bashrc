# ~/.bashrc

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
alias grep='grep --color=auto'
PS1='[\u@\h \W]\$ '

# OH MY POSH:
# export PATH=$PATH:/home/awan/.local/bin
eval "$(oh-my-posh init bash --config /home/moeez/.config/oh-my-posh/omp_config.omp.json)"

# RUN NEOFETCH ON TERMINAL LAUNCH:
neofetch

# BASH-COMPLETION:
# [[ $PS1 && -f /usr/share/bash-completion/bash_completion ]] && . /usr/share/bash-completion/bash_completion
