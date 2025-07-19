import { App, Astal, Gtk } from "astal/gtk3";
import GLib from "gi://GLib";

export function PowerWindow() {
  const shutdownIcon = Gtk.Image.new_from_file(
    `${GLib.get_home_dir()}/.config/ags/widget/topbar/icons/shutdown.svg`,
  );
  const rebootIcon = Gtk.Image.new_from_file(
    `${GLib.get_home_dir()}/.config/ags/widget/topbar/icons/reboot.svg`,
  );
  const lockIcon = Gtk.Image.new_from_file(
    `${GLib.get_home_dir()}/.config/ags/widget/topbar/icons/lock.svg`,
  );
  return (
    <window
      name="powerwindow"
      visible={false}
      setup={(self) => {
        App.add_window(self);
      }}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.RIGHT |
        Astal.WindowAnchor.BOTTOM |
        Astal.WindowAnchor.LEFT
      }
      exclusivity={Astal.Exclusivity.NORMAL}
      focusOnMap={true}
      acceptFocus={true}
    >
      <eventbox
        hexpand={true}
        vexpand={true}
        onButtonPressEvent={(self, event) => {
          const target = self.get_toplevel();
          if (target) target.visible = false;
          return true;
        }}
      >
        <box
          orientation={Gtk.Orientation.HORIZONTAL}
          margin={200}
          className="widget_container"
          hexpand={true}
          vexpand={true}
          setup={(self) => self.grab_focus()}
        >
          <button
            hexpand={true}
            vexpand={true}
            onClicked={() => GLib.spawn_command_line_async("hyprlock")}
            image={lockIcon}
            always_show_image={true}
          />
          <button
            hexpand={true}
            vexpand={true}
            onClicked={() => GLib.spawn_command_line_async("shutdown now")}
            image={shutdownIcon}
            always_show_image={true}
          />
          <button
            hexpand={true}
            vexpand={true}
            onClicked={() => GLib.spawn_command_line_async("reboot")}
            image={rebootIcon}
            always_show_image={true}
          />
        </box>
      </eventbox>
    </window>
  );
}

export function Power() {
  return (
    <button className="power" onClick={() => App.toggle_window("powerwindow")}>
      <label label="" className="nf-icon" />
    </button>
  );
}
