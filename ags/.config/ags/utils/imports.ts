// CANT EXPORT app AND readFile
// THIS FILE EXISTS TO MAKE HANDLING IMPORT PATHS EASIER
export { For, With, createState, createBinding } from "ags";
export { execAsync, exec } from "ags/process";
export { createPoll } from "ags/time";

// gi://
import Astal from "gi://Astal?version=4.0";
import Mpris from "gi://AstalMpris?version=0.1";
import Hyprland from "gi://AstalHyprland?version=0.1";
import AstalTray from "gi://AstalTray?version=0.1";
import Battery from "gi://AstalBattery?version=0.1";
import Wp from "gi://AstalWp?version=0.1";
import Apps from "gi://AstalApps?version=0.1";

import Gtk from "gi://Gtk?version=4.0";
import GLib from "gi://GLib?version=2.0";
import Gdk from "gi://Gdk?version=4.0";

export { Battery, Wp, Astal, AstalTray, Hyprland, Mpris, Apps };
export { Gdk, Gtk, GLib };
