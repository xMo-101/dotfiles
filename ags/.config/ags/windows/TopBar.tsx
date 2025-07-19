import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { TimeButton } from "../widget/topbar/NotificationCenter";
import { WorkspaceView } from "../widget/topbar/Workspaces";
import { Tray } from "../widget/topbar/Tray";
import { Settings } from "../widget/topbar/Settings";
import { Power } from "../widget/topbar/Power";

export function TopBar(monitor: Gdk.Monitor) {
  return (
    <window
      name="topbar"
      className="TopBar"
      gdkmonitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      application={App}
    >
      <centerbox className={"topbar__background"}>
        <box className="left" hexpand halign={Gtk.Align.START}>
          <WorkspaceView />
        </box>

        <box className="center" hexpand halign={Gtk.Align.CENTER}>
          <TimeButton />
        </box>

        <box className="right" hexpand halign={Gtk.Align.END}>
          <Tray />
          <Settings />
          <Power />
        </box>
      </centerbox>
    </window>
  );
}
