import Battery from "gi://AstalBattery";
import Gtk from "gi://Gtk?version=4.0";
import { createBinding } from "ags";

export function myBattery() {
  const battery = Battery.get_default();
  const percentage = createBinding(battery, "percentage");
  const batteryIcon = createBinding(battery, "battery_icon_name");

  return (
    <box
      hexpand
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
      spacing={6}
    >
      <image
        iconName={batteryIcon}
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.CENTER}
      />
      <label
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.CENTER}
        label={percentage((val) => `${(val * 100).toFixed(0)}%`)}
      />
    </box>
  );
}
