#!/bin/bash
sudo pacman -Syu

sudo pacman -S yay # AUR helper
yay -Syu

sudo pacman -S sddm libreoffice nautilus # file manager
sudo pacman -S udiskie obsidian
sudo pacman -S blueman alacritty

yay -S rofi hypridle hyprpaper hyprlock wlogout waybar
sudo pacman -S gnome-calculator gnome-text-editor

# NEOVIM
yay -S neovim
sudo pacman -S ripgrep fd fzf # for neovim telescope
sudo pacman -S hyprland wayland grim # hyprland stuff
sudo pacman -S --needed hyprcursor hyprgraphics hypridle hyprland hyprland-qt-support hyprland-qtutils hyprlang hyprlock hyprpaper hyprpicker hyprshot hyprutils
