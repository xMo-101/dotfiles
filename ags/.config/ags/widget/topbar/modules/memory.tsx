import SystemMonitor from "../../../utils/hwinfo";
import Gtk from "gi://Gtk?version=4.0";
import { createBinding } from "ags";

export function Memory() {
  const sysmon = SystemMonitor.get_default();
  const load = createBinding(sysmon, "memoryUtilization");

  return (
    <box halign={Gtk.Align.CENTER} valign={Gtk.Align.CENTER} spacing={6}>
      <label label="" />
      <label label={load((v) => `${(v * 100).toFixed(0)}%`)} />
    </box>
  );
}
