import { Battery } from "@/utils/imports";
import { createBinding } from "@/utils/imports";
import { formatFraction } from "@/utils/helper-functions";

export function myBattery() {
  const battery = Battery.get_default();
  const percentage = createBinding(battery, "percentage");
  const batteryIcon = createBinding(battery, "battery_icon_name");

  return (
    <box class="info-small">
      <image pixelSize={20} iconName={batteryIcon} />
      <label label={percentage(formatFraction)} />
    </box>
  );
}
