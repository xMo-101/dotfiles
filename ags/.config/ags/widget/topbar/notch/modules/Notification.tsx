import { createBinding, For, Gtk } from "@/utils/imports";
import AstalNotifd from "gi://AstalNotifd?version=0.1";

export function Notification({
  NotificationObject,
}: {
  NotificationObject: AstalNotifd.Notification;
}) {
  const appPicture = NotificationObject.get_app_icon();
  const appName = NotificationObject.get_app_name();
  const summary = NotificationObject.get_summary();
  const body = NotificationObject.get_body();
  const time = NotificationObject.get_time();

  return (
    <box $type="named" name="lol">
      <image iconName={appPicture} />
      <label label={appName} />
      <box orientation={Gtk.Orientation.VERTICAL}>
        <box orientation>
          <label label={summary} />
        </box>
        <label label={body} />
      </box>
    </box>
  );
}
