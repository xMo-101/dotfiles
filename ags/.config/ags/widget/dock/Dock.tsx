import { Astal, Gdk, Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import { createState } from "ags";
import { DockApps } from "./DockApps";

const [isDockVisible, setDockVisibility] = createState(false);

export function Dock() {
  return (
    <window
      anchor={Astal.WindowAnchor.BOTTOM}
      name="dock"
      namespace={"dock"}
      $={(_self) => app.add_window(_self)}
      layer={Astal.Layer.OVERLAY}
      visible={isDockVisible}
      heightRequest={100}
      exclusivity={Astal.Exclusivity.TOP} // <- make it top so it overlaps other windows
      class="surface-0 border"
    >
      <box
        $={(self) => {
          const motion = new Gtk.EventControllerMotion();
          motion.connect("leave", () => setDockVisibility(false));
          self.add_controller(motion);
        }}
        class="transparent"
      >
        <DockApps />
      </box>
    </window>
  );
}

export function DockRaiser(monitor: Gdk.Monitor) {
  return (
    <window
      anchor={Astal.WindowAnchor.BOTTOM}
      name="dockraiser"
      visible={true}
      gdkmonitor={monitor}
      layer={Astal.Layer.OVERLAY}
      exclusivity={Astal.Exclusivity.IGNORE}
      class="dbg"
    >
      <box
        $={(self) => {
          self.set_size_request(800, 30);
          const motion = new Gtk.EventControllerMotion();
          motion.connect("enter", () => setDockVisibility(true));
          self.add_controller(motion);
        }}
        class="transparent"
      />
    </window>
  );
}
