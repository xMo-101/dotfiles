import { GLib, Gtk } from "@/utils/imports";

const pinnedApps = [
  { label: "brave-browser", icon: "brave-desktop", cmd: "brave" },
  { label: "discord", icon: "discord", cmd: "discord" },
  { label: "neovim", icon: "nvim", cmd: "kitty -e nvim" },
  { icon: "kitty", cmd: "kitty", label: "kitty terminal" },
  { icon: "yazi", cmd: "kitty -e yazi", label: "explorer" },
  { icon: "endeavouros-icon", cmd: "eos-update", label: "update" },
  {
    icon: "user-trash-symbolic",
    cmd: "kitty -e yazi ~/.local/share/Trash/files",
    label: "trash",
  },
  {
    icon: "view-app-grid-symbolic",
    cmd: "ags toggle launcher",
    label: "overview",
  },
];

export function DockApps() {
  const width = 100;
  const height = 100;
  return (
    <box orientation={Gtk.Orientation.HORIZONTAL}>
      {pinnedApps.map(({ label, icon, cmd }, i) => (
        <button
          hexpand
          vexpand
          widthRequest={width}
          heightRequest={height}
          tooltipText={label}
          onClicked={() => {
            GLib.spawn_command_line_async(`${cmd}`);
          }}
          class="button-dock"
        >
          <image pixelSize={52} iconName={icon} />
        </button>
      ))}
    </box>
  );
}
