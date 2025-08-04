import app from "ags/gtk4/app";
import { Astal, Gtk } from "ags/gtk4";
import { createState, createBinding } from "ags";
import Wp from "gi://AstalWp";

import { Cpu } from "./modules/cpu";
import { Memory } from "./modules/memory";
import { myBattery } from "./modules/battery";
import { Brightness } from "../../utils/brightness";

const [isSettingsVisible, setSettingsVisibility] = createState(false);
let vv = false;
function toggleSettingsVisibility() {
  vv = !vv;
  setSettingsVisibility(vv);
}

const brightness = Brightness.get_default();
const WINDOW_NAME = "settings-window";

export function SettingsWindow() {
  const wp = Wp.get_default()!;
  const speaker = wp.audio.get_default_speaker()!;
  const mic = wp.audio.get_default_microphone()!;

  const audioVolText = createBinding(
    speaker,
    "volume",
  )(
    (v) =>
      `${Math.round(v * 100)
        .toString()
        .padStart(3, " ")}%`,
  );
  const micVolText = createBinding(
    mic,
    "volume",
  )(
    (v) =>
      `${Math.round(v * 100)
        .toString()
        .padStart(3, " ")}%`,
  );
  const brightnessText = createBinding(
    brightness,
    "screen",
  )(
    (v) =>
      `${Math.round(v * 100)
        .toString()
        .padStart(3, " ")}%`,
  );

  return (
    <window
      name={WINDOW_NAME}
      namespace={WINDOW_NAME}
      $={(self) => app.add_window(self)}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
      layer={Astal.Layer.OVERLAY}
      exclusivity={Astal.Exclusivity.NORMAL}
      visible={isSettingsVisible}
      marginTop={5}
      marginRight={5}
      keymode={Astal.Keymode.ON_DEMAND}
      class="outermost"
    >
      <box
        hexpand={true}
        vexpand={true}
        valign={Gtk.Align.FILL}
        widthRequest={325}
        $={(self) => {
          const click = new Gtk.GestureClick();
          click.connect("pressed", () => togglesettingsVisibility());
          self.add_controller(click);
        }}
        class="padded_container"
      >
        <box orientation={Gtk.Orientation.VERTICAL}>
          {/* TOP: Battery, CPU, RAM */}
          <box
            orientation={Gtk.Orientation.HORIZONTAL}
            hexpand
            valign={Gtk.Align.FILL}
          >
            {myBattery() ?? null}
            {Cpu()}
            {Memory()}
          </box>

          {/* Separator between status and sliders */}
          <Gtk.Separator orientation={Gtk.Orientation.HORIZONTAL} />

          {/* BOTTOM: Sliders each in their own row */}
          <box orientation={Gtk.Orientation.VERTICAL}>
            {/* Speaker Row */}
            <box
              $={(self) => {
                const click = new Gtk.GestureClick();
                click.connect("pressed", () => (speaker.mute = !speaker.mute));
                self.add_controller(click);
              }}
            >
              <box
                orientation={Gtk.Orientation.HORIZONTAL}
                hexpand
                valign={Gtk.Align.CENTER}
              >
                <slider
                  class="slider with-icon"
                  orientation={Gtk.Orientation.HORIZONTAL}
                  value={createBinding(speaker, "volume")}
                  min={0}
                  max={1}
                  step={0.01}
                  onChangeValue={({ value }) => speaker.set_volume(value)}
                  hexpand
                />
                <image
                  iconName={createBinding(speaker, "volume_icon")}
                  halign={Gtk.Align.START}
                  valign={Gtk.Align.CENTER}
                  class="slider-icon"
                />
                <label
                  label={audioVolText}
                  valign={Gtk.Align.CENTER}
                  class="volume-text"
                />
              </box>
            </box>

            {/* Mic Row */}
            <box
              $={(self) => {
                const click = new Gtk.GestureClick();
                click.connect("pressed", () => (speaker.mute = !speaker.mute));
                self.add_controller(click);
              }}
            >
              <box
                orientation={Gtk.Orientation.HORIZONTAL}
                hexpand
                valign={Gtk.Align.CENTER}
              >
                <slider
                  class="slider with-icon"
                  orientation={Gtk.Orientation.HORIZONTAL}
                  value={createBinding(mic, "volume")}
                  min={0}
                  max={1}
                  step={0.01}
                  onChangeValue={({ value }) => mic.set_volume(value)}
                  hexpand
                />
                <image
                  iconName={createBinding(mic, "volume_icon")}
                  halign={Gtk.Align.START}
                  valign={Gtk.Align.CENTER}
                  class="slider-icon"
                />
                <label
                  label={micVolText}
                  valign={Gtk.Align.CENTER}
                  class="volume-text"
                />
              </box>
            </box>

            {/* Brightness Row */}
            <box>
              <box
                orientation={Gtk.Orientation.HORIZONTAL}
                hexpand
                valign={Gtk.Align.CENTER}
              >
                <slider
                  class="slider with-icon"
                  orientation={Gtk.Orientation.HORIZONTAL}
                  value={createBinding(brightness, "screen")}
                  min={0}
                  max={1}
                  step={0.01}
                  onChangeValue={({ value }) => (brightness.screen = value)}
                  hexpand
                />
                <image
                  iconName="display-brightness-symbolic"
                  halign={Gtk.Align.START}
                  valign={Gtk.Align.CENTER}
                  class="slider-icon"
                />
                <label
                  label={brightnessText}
                  valign={Gtk.Align.CENTER}
                  class="volume-text"
                />
              </box>
            </box>
          </box>
        </box>
      </box>
    </window>
  );
}

export function Settings() {
  return (
    <button class="button-long" onClicked={toggleSettingsVisibility}>
      <image iconName="preferences-system-symbolic"></image>
    </button>
  );
}
