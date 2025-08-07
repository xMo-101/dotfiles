import { Gtk, GLib, createState } from "@/utils/imports";

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
    <button class="button-large" onClicked={action} tooltip_text={tooltip_text}>
      <image iconName={icon} pixelSize={32} />
    </button>
  );
}

function ToggleButtonTemplate({
  icon,
  action,
  tooltip_text,
  init,
}: {
  icon: string;
  action: () => void;
  tooltip_text: string;
  init: boolean;
}) {
  const [classState, setClassState] = createState(
    init ? "button-toggled" : "button-large",
  );

  const toggleButton = () => {
    setClassState((prev) =>
      prev === "button-toggled" ? "button-large" : "button-toggled",
    );
  };

  return (
    <button
      class={classState}
      onClicked={() => {
        action();
        toggleButton();
      }}
      tooltip_text={tooltip_text}
    >
      <image iconName={icon} pixelSize={32} />
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
  const action = () =>
    GLib.spawn_command_line_async(`${scripts()}/hyprshot/hyprshot-area.sh`);

  return (
    <ButtonTemplate
      icon="accessories-screenshot-symbolic"
      action={action}
      tooltip_text="screenshot area"
    />
  );
}

function ScreenshotMonitorButton() {
  const action = () =>
    GLib.spawn_command_line_async(`${scripts()}/hyprshot/hyprshot-monitor.sh`);

  return (
    <ButtonTemplate
      icon="accessories-screenshot"
      action={action}
      tooltip_text="screenshot monitor"
    />
  );
}

function ColorpickerButton() {
  const action = () =>
    GLib.spawn_command_line_async(`${scripts()}/hyprpicker/hyprpicker.sh`);
  return (
    <ButtonTemplate
      icon="color-select-symbolic"
      action={action}
      tooltip_text="colorpicker"
    />
  );
}

function HyprlandReloadButton() {
  const action = () =>
    GLib.spawn_command_line_async(`${scripts()}/utils/hyprreload.sh`);
  return <ButtonTemplate icon="view-refresh-symbolic" action={action} />;
}

function DNDButton() {
  const action = () => print("WIP");
  return (
    <ToggleButtonTemplate
      init={false}
      action={action}
      icon="notifications-disabled-symbolic"
      tooltip_text="DND"
    />
  );
}

function SpeedtestButton() {
  const action = () =>
    GLib.spawn_command_line_async(`alacritty -e bash -c 'speedtest';read`);
  return (
    <ButtonTemplate
      icon="network-transmit-receive-symbolic"
      action={action}
      tooltip_text="network speedtest"
    />
  );
}

function RecordScreenButton() {
  const action = () =>
    GLib.spawn_command_line_async(`${scripts()}/wf-recorder/wf-recorder.sh`);
  return (
    <ToggleButtonTemplate
      action={action}
      icon="media-record-symbolic"
      init={false}
      tooltip_text="toggle screen recording"
    />
  );
}

function SunsetButton() {
  const action = () => print("WIP");
  return (
    <ToggleButtonTemplate
      action={action}
      icon="weather-clear-night-symbolic"
      init={false}
      tooltip_text="bluelight filter"
    />
  );
}

export function Opts() {
  const childrenPerLine = 5;
  return (
    <box $type="named" name="page-opts" orientation={Gtk.Orientation.VERTICAL}>
      <Gtk.FlowBox
        homogeneous={true}
        maxChildrenPerLine={childrenPerLine}
        minChildrenPerLine={1}
      >
        <ScreenshotAreaButton />
        <ScreenshotMonitorButton />
        <ColorpickerButton />
        <HyprlandReloadButton />
        <SpeedtestButton />
      </Gtk.FlowBox>
      <Gtk.Separator />
      <Gtk.FlowBox
        homogeneous={true}
        maxChildrenPerLine={childrenPerLine}
        minChildrenPerLine={1}
      >
        <DNDButton />
        <RecordScreenButton />
        <SunsetButton />
      </Gtk.FlowBox>
    </box>
  );
}
