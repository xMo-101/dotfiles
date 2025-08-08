import { GLib, Gtk } from "@/utils/imports";

const pinnedApps = [
  { label: "brave-browser", icon: "brave-desktop", cmd: "brave" },
  { label: "discord", icon: "discord", cmd: "discord" },
  { label: "neovim", icon: "nvim", cmd: "alacritty -e nvim" },
  { icon: "Alacritty", cmd: "alacritty", label: "alacritty" },
  { icon: "nautilus", cmd: "nautilus", label: "explorer" },
  { icon: "endeavouros-icon", cmd: "eos-update", label: "update" },
  {
    icon: "user-trash-symbolic",
    cmd: "nautilus trash:",
    label: "trash",
  },
  {
    icon: "view-app-grid-symbolic",
    cmd: "ags toggle appoverview",
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
