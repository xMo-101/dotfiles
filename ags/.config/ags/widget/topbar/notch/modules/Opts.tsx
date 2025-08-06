import { Gtk } from "@/utils/imports";
import GLib from "gi://GLib";

function ButtonTemplate({
  icon,
  action,
  tooltip_text = "",
}: {
  icon: String;
  action: () => void;
  tooltip_text: String;
}) {
  return (
    <button class="button-long" onClicked={action} tooltip_text={tooltip_text}>
      <image iconName={icon} pixelSize={24} />
    </button>
  );
}

function home(): String {
  return GLib.get_home_dir();
}

function scripts(): String {
  return home() + "/.config/hypr/scripts";
}

function ScreenshotAreaButton() {
  return (
    <ButtonTemplate
      icon="accessories-screenshot-symbolic"
      action={() =>
        GLib.spawn_command_line_async(`${scripts()}/hyprshot/hyprshot-area.sh`)
      }
      tooltip_text="screenshot area"
    />
  );
}

function ScreenshotMonitorButton() {
  return (
    <ButtonTemplate
      icon="accessories-screenshot"
      action={() =>
        GLib.spawn_command_line_async(
          `${scripts()}/hyprshot/hyprshot-monitor.sh`,
        )
      }
      tooltip_text="screenshot monitor"
    />
  );
}

function ColorpickerButton() {
  return (
    <ButtonTemplate
      icon="color-select-symbolic"
      action={() =>
        GLib.spawn_command_line_async(`${home()}/.config/hypr/hyprpicker.sh`)
      }
    />
  );
}

export function Opts() {
  return (
    <box $type="named" name="page-opts">
      <Gtk.FlowBox maxChildrenPerLine={4} minChildrenPerLine={1}>
        <ScreenshotAreaButton />
        <ScreenshotMonitorButton />
        <ColorpickerButton />
      </Gtk.FlowBox>
    </box>
  );
}
