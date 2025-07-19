import GLib from "gi://GLib";
export function deviceType() {
  const path = "/org/freedesktop/UPower/devices/battery_BAT0";
  const exists = GLib.file_test(path, GLib.FileTest.EXISTS);
  if (!exists) {
    console.warn("Battery device not found at", path);
    return "DESKTOP";
  }
  return "LAPTOP";
}
