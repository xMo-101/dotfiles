import { Gtk } from "@/utils/imports";

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
