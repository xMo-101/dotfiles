import SystemMonitor from "../../../utils/hwinfo";
import { Gtk, createBinding } from "@/utils/imports";
import { formatFraction } from "@/utils/helper-functions";

export function Cpu() {
  const sysmon = SystemMonitor.get_default();
  const load = createBinding(sysmon, "cpuLoad");

  return (
    <box class="info-small">
      <image pixelSize={20} iconName="computer-laptop-symbolic" />
      <label label={load(formatFraction)} />
    </box>
  );
}
