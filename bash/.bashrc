# ~/.bashrc

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
alias grep='grep --color=auto'
PS1='[\u@\h \W]\$ '

# OH MY POSH:
export PATH=$PATH:/home/awan/.local/share
eval "$(oh-my-posh init bash --config /home/awan/omp_config.omp.json)"

# RUN NEOFETCH ON TERMINAL LAUNCH:
neofetch
