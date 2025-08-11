import { createBinding, For, Gtk } from "@/utils/imports";
import AstalNotifd from "gi://AstalNotifd?version=0.1";
import { Notification } from "./Notification";

export function NotificationPopup({
  stack,
  box,
}: {
  stack: Gtk.Stack;
  box: Gtk.Box;
}) {
  if (stack === null) {
    print("bruh");
    return;
  }
  const Notifd = AstalNotifd.get_default();
  Notifd.connect("notified", (_, id) => {
    const NotificationObject = Notifd.get_notification(id);
    const NotificationTSX = (
      <Notification NotificationObject={NotificationObject} />
    );
    box.append(NotificationTSX);
    stack.set_visible_child_name("page-notified");
  });
}
