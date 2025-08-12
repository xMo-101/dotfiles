import { Battery, GLib } from "@/utils/imports";
import { createBinding } from "@/utils/imports";
import { formatFraction } from "@/utils/helper-functions";

export function myBattery() {
  const APP_NAME = "Battery Monitor";
  const battery = Battery.get_default();
  const percentage = createBinding(battery, "percentage");
  const batteryIcon = createBinding(battery, "battery_icon_name");

  const handlerId = battery.connect("notify::percentage", () => {
    const pct = battery.percentage * 100;
    if (battery.get_charging()) return;

    if (pct <= 5) {
      GLib.spawn_command_line_async(
        `notify-send -a "${APP_NAME}" "Battery critical" "Only ${pct.toFixed(0)}% left! Plug in immediately."`,
      );
    } else if (pct <= 10) {
      GLib.spawn_command_line_async(
        `notify-send -a "${APP_NAME}" "Battery very low" "Battery at ${pct.toFixed(0)}%. Consider charging soon."`,
      );
    } else if (pct <= 20) {
      GLib.spawn_command_line_async(
        `notify-send -a "${APP_NAME}" "Battery low" "Battery at ${pct.toFixed(0)}%. Reduce usage or charge."`,
      );
    }
  });

  return (
    <box class="info-small">
      <image pixelSize={20} iconName={batteryIcon} />
      <label label={percentage(formatFraction)} />
    </box>
  );
}
