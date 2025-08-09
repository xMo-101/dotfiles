import { GLib } from "@/utils/imports";

export function deviceType() {
  const path = "/sys/class/power_supply/BAT1";
  const exists = GLib.file_test(path, GLib.FileTest.EXISTS);
  if (!exists) {
    console.warn("Battery device not found at", path);
    return "DESKTOP";
  }
  return "LAPTOP";
}
