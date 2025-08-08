import app from "ags/gtk4/app";
import Gtk from "gi://Gtk?version=4.0";
import { createPoll } from "ags/time";

function content() {
  const timedate = createPoll("", 1000, "date '+%H:%M:%S   %d.%m.%Y'");
  return <label label={timedate}></label>;
}

export function Time() {
  return <Gtk.StackPage child={content()} $type="named" name="page-time" />;
}
