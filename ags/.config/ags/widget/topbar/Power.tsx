import { Astal, Gtk } from "ags/gtk4";
import app from "ags/gtk4/app";
import GLib from "gi://GLib";

const WINDOW_NAME = "powerwindow";

export function PowerWindow() {
  const btnWidth = 480;
  const btnHeight = 640;
  const iconSize = 104;
  return (
    <window
      name={WINDOW_NAME}
      namespace={WINDOW_NAME}
      visible={false}
      $={(self) => {
        app.add_window(self);
      }}
      keymode={Astal.Keymode.ON_DEMAND}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      class="surface-0"
    >
      <box
        hexpand={true}
        vexpand={true}
        $={(self) => {
          const motion = new Gtk.EventControllerMotion();
          motion.connect("leave", () => app.toggle_window(WINDOW_NAME));
          self.add_controller(motion);
        }}
        class={"transparent"}
      >
        <box
          orientation={Gtk.Orientation.VERTICAL}
          hexpand
          vexpand
          halign={Gtk.Align.CENTER}
          valign={Gtk.Align.CENTER}
          class={"transparent"}
        >
          <box class="transparent" orientation={Gtk.Orientation.HORIZONTAL}>
            <button
              widthRequest={btnWidth}
              heightRequest={btnHeight}
              onClicked={() => GLib.spawn_command_line_async("hyprlock")}
              class="button-power"
            >
              <image pixelSize={iconSize} iconName="lock-symbolic" />
            </button>
            <button
              widthRequest={btnWidth}
              heightRequest={btnHeight}
              onClicked={() => GLib.spawn_command_line_async("shutdown now")}
              class="button-power"
            >
              <image iconName="system-shutdown-symbolic" pixelSize={iconSize} />
            </button>
            <button
              widthRequest={btnWidth}
              heightRequest={btnHeight}
              onClicked={() => GLib.spawn_command_line_async("reboot")}
              class="button-power"
            >
              <image pixelSize={iconSize} iconName="system-reboot-symbolic" />
            </button>
          </box>
        </box>
      </box>
    </window>
  );
}

export function Power() {
  return (
    <button
      class="button-long"
      onClicked={() => app.toggle_window("powerwindow")}
    >
      <image iconName="system-shutdown" />
    </button>
  );
}
