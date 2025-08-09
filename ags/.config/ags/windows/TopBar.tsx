import app from "ags/gtk4/app";
import { Astal, Gdk, Gtk } from "@/utils/imports.js";
import { WorkspaceView } from "../widget/topbar/Workspaces.tsx";

import { Tray } from "../widget/topbar/Tray";
import { Settings } from "../widget/topbar/Settings";
import { Power } from "../widget/topbar/Power";

export function TopBar(monitor: Gdk.Monitor) {
  return (
    <window
      name="topbar"
      namespace="topbar"
      gdkmonitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      visible={true}
      application={app}
      class="surface-0"
    >
      <centerbox class="transparent">
        <box class="transparent" $type="start">
          <WorkspaceView />
        </box>

        <box class="transparent" $type="end">
          <Tray />
          <Gtk.Separator />
          <Settings />
          <Power />
        </box>
      </centerbox>
    </window>
  );
}
