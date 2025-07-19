import { bind } from "astal";
import { Variable } from "astal";
import SystemMonitor from "../../../utils/hwinfo";
import { CircularProgress } from "astal/gtk3/widget";

export function Cpu() {
  const sysmon = SystemMonitor.get_default();
  let load = bind(sysmon, "cpuLoad");
  return (
    <box>
      <CircularProgress value={load} startAt={0.75} endAt={0.75}>
        <button
          hexpand={true}
          label={load.as(
            (val) => `${(val * 100).toFixed(0).toString().padStart(3, " ")}%`,
          )}
        />
      </CircularProgress>
    </box>
  );
}
