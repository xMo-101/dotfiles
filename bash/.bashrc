# ~/.bashrc

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
alias grep='grep --color=auto'
PS1='[\u@\h \W]\$ '

# OH MY POSH:
eval "$(oh-my-posh init bash --config /home/$USER/.config/oh-my-posh/omp_config.omp.json)"

# ALIAS:
alias n="nvim ."
alias e="exit"
