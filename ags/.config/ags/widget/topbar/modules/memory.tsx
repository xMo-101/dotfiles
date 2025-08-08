import SystemMonitor from "@/utils/hwinfo";
import { formatFraction } from "@/utils/helper-functions";
import { Gtk, createBinding } from "@/utils/imports";

export function Memory() {
  const sysmon = SystemMonitor.get_default();
  const load = createBinding(sysmon, "memoryUtilization");

  return (
    <box class="info-small">
      <image pixelSize={20} iconName="media-flash-symbolic" />
      <label label={load(formatFraction)} />
    </box>
  );
}
