import GLib from "gi://GLib";
import Gtk from "gi://Gtk?version=4.0";

export function Opts() {
  return (
    <box $type="named" name="page-opts">
      <Gtk.FlowBox>
        <button
          label="screenie"
          onClicked={() =>
            GLib.spawn_command_line_async("~/.config/hypr/hyprshot.sh")
          }
        />
        <button
          label="screenie"
          onClicked={() =>
            GLib.spawn_command_line_async("~/.config/hypr/hyprshot.sh")
          }
        />
        <button
          label="screenie"
          onClicked={() =>
            GLib.spawn_command_line_async("~/.config/hypr/hyprshot.sh")
          }
        />
        <button
          label="screenie"
          onClicked={() =>
            GLib.spawn_command_line_async("~/.config/hypr/hyprshot.sh")
          }
        />
        <button
          label="screenie"
          onClicked={() =>
            GLib.spawn_command_line_async("~/.config/hypr/hyprshot.sh")
          }
        />
        <button
          label="screenie"
          onClicked={() =>
            GLib.spawn_command_line_async("~/.config/hypr/hyprshot.sh")
          }
        />
      </Gtk.FlowBox>
    </box>
  );
}
