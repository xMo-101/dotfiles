import app from "ags/gtk4/app";
import Gtk from "gi://Gtk?version=4.0";
import { createPoll } from "ags/time";

export function Time() {
  const timedate = createPoll("", 1000, "date '+%H:%M:%S   %d.%m.%Y'");
  return (
    <box $type="named" name="page-time">
      <label label={timedate}></label>
    </box>
  );
}
