// THIS FILE EXISTS TO MAKE HANDLING IMPORT PATHS EASIER
export { For, With, createState, createBinding } from "ags";
export { Astal } from "ags/gtk4";
export { app } from "ags/gtk4/app";
export { execAsync } from "ags/process";

// gi://
import Mpris from "gi://AstalMpris?version=0.1";
import Gtk from "gi://Gtk?version=4.0";
import GLib from "gi://GLib";
export { Mpris, Gtk, GLib };
