import { Gtk, createPoll, app } from "@/utils/imports";

function content() {
  const timedate = createPoll("", 1000, "date '+%H:%M:%S   %d.%m.%Y'");
  return <label label={timedate}></label>;
}

export function Time() {
  return <Gtk.StackPage child={content()} $type="named" name="page-time" />;
}
