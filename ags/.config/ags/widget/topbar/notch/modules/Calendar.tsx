import Gtk from "gi://Gtk?version=4.0";

function content() {
  return <Gtk.Calendar />;
}

export function Calendar() {
  return (
    <Gtk.StackPage
      title="2"
      $type="named"
      name="page-calendar"
      child={content()}
    />
  );
}
