import { CircularProgress } from "astal/gtk3/widget";
import { Variable } from "astal";
import { execAsync } from "astal/process";
import { deviceType } from "../../../utils/deviceType";

export function Battery() {
  if (deviceType() !== "LAPTOP") {
    console.warn("Battery widget is only available on laptops.");
    return <box className="ignore transparent" />;
  }
  const batteryLevel = Variable(0).poll(15_000, async () => {
    try {
      const out = await execAsync(
        "upower -i /org/freedesktop/UPower/devices/battery_BAT0",
      );
      const line = out.split("\n").find((l) => l.includes("percentage"));
      return line ? parseInt(line.match(/\d+/)?.[0] || "0") : 0;
    } catch (e) {
      console.error("Battery polling failed:", e);
      return 0;
    }
  });

  return (
    <box hexpand={true}>
      <CircularProgress value={batteryLevel} startAt={0.75} endAt={0.75}>
        <button
          label={batteryLevel.as((val) => {
            const icon =
              val > 80
                ? ""
                : val > 60
                  ? ""
                  : val > 40
                    ? ""
                    : val > 20
                      ? ""
                      : "";
            return `${icon} ${val.toString().padStart(3)}%`;
          })}
        />
      </CircularProgress>
    </box>
  );
}
