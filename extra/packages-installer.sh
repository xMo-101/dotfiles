#!/bin/bash
set -e

echo "Updating system..."
sudo pacman -Syu --noconfirm

echo "Installing pacman packages..."
sudo pacman -S --needed --noconfirm \
  hyprland \
  git \
  yay \
  kitty \
  bash-completion \
  wl-clipboard \
  adwaita-icon-theme \
  papirus-icon-theme \
  udiskie \
  nwg-look \
  hyprshot \
  hyprpicker \
  hypridle \
  hyprlock \
  obs-studio \
  gnome-calculator \
  showtime \
  loupe \
  cmatrix \
  cava \
  swww \
  speedtest-cli \
  wf-recorder \
  ascii \
  yazi \
  typst \
  evince \
  dotnet-sdk \
  dotnet-runtime

echo "Installing yay packages..."
yay -S --needed --noconfirm \
  stow \
  rofi \
  neofetch \
  ttf-jetbrains-mono-nerd \
  brave-bin \
  waypaper \
  oh-my-posh

echo "Installing npm packages..."
npm install -g sass typescript

echo "All packages installed successfully."
