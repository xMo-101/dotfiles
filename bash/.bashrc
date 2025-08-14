# ~/.bashrc

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
alias grep='grep --color=auto'
PS1='[\u@\h \W]\$ '

# OH MY POSH:
eval "$(oh-my-posh init bash --config /home/moeez/.config/oh-my-posh/omp_config.omp.json)"

# NEOFETCH:
if [ -f /usr/bin/neofetch ]; then
    neofetch
fi

# BASH-COMPLETION:
if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
fi

# ALIAS:
alias y=yazi
alias n="nvim ."
alias e="exit"
