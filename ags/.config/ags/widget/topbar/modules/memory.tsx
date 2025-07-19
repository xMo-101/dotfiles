import { bind } from "astal";
import SystemMonitor from "../../../utils/hwinfo";
import { CircularProgress } from "astal/gtk3/widget";

export function Memory() {
  const sysmon = SystemMonitor.get_default();
  let load = bind(sysmon, "memoryUtilization");

  return (
    <box>
      <CircularProgress value={load} startAt={0.75} endAt={0.75}>
        <button
          hexpand={true}
          label={load.as(
            (val) => ` ${(val * 100).toFixed(0).toString().padStart(3, " ")}%`,
          )}
        />
      </CircularProgress>
    </box>
  );
}
