import Gtk from "gi://Gtk?version=4.0";

export function Calendar() {
  return (
    <box $type="named" name="page-calendar">
      <Gtk.Calendar />
    </box>
  );
}
