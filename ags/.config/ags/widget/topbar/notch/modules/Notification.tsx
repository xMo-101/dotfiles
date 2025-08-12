import { createBinding, For, Gtk } from "@/utils/imports";
import AstalNotifd from "gi://AstalNotifd?version=0.1";
import Pango from "gi://Pango?version=1.0";

export function formatUnixToHHMM(
  seconds: number,
  opts?: { utc?: boolean },
): string {
  const d = new Date(seconds * 1000); // seconds → ms
  const hh = (opts?.utc ? d.getUTCHours() : d.getHours())
    .toString()
    .padStart(2, "0");
  const mm = (opts?.utc ? d.getUTCMinutes() : d.getMinutes())
    .toString()
    .padStart(2, "0");
  return `${hh}:${mm}`;
}

export function Notification({
  NotificationObject,
}: {
  NotificationObject: AstalNotifd.Notification;
}) {
  const appName = NotificationObject.get_app_name();
  const summary = NotificationObject.get_summary();
  const body = NotificationObject.get_body();
  const time = NotificationObject.get_time();

  return (
    <box class="notif">
      <label label={appName} />
      <Gtk.Separator />
      <box orientation={Gtk.Orientation.VERTICAL}>
        <box>
          <label label={summary} />
          <box hexpand />
          <label label={formatUnixToHHMM(time)} />
        </box>
        <label
          ellipsize={Pango.EllipsizeMode.END}
          maxWidthChars={65}
          widthChars={10}
          label={body != "" ? body : "No details provided."}
        />
      </box>
    </box>
  );
}
