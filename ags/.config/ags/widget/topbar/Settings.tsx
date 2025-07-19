import { Astal, Gtk } from "astal/gtk3";
import GLib from "gi://GLib";
import { Variable, bind } from "astal";
import Wp from "gi://AstalWp";
import { Cpu } from "./modules/cpu";
import { Memory } from "./modules/memory";
import { Battery } from "./modules/battery";
import { deviceType } from "../../utils/deviceType";

const isSettingsVisible = Variable(false);
function toggleSettingsVisibility() {
  isSettingsVisible.set(!isSettingsVisible.get());
}

export function SettingsWindow() {
  const wp = Wp.get_default()!;
  const speaker = wp.audio.get_default_speaker()!;
  const mic = wp.audio.get_default_microphone()!;

  const audioVolText = bind(speaker, "volume").as(
    (v) =>
      `${Math.round(v * 100)
        .toString()
        .padStart(3, " ")}%`,
  );
  const micVolText = bind(mic, "volume").as(
    (v) =>
      `${Math.round(v * 100)
        .toString()
        .padStart(3, " ")}%`,
  );
  const battery = deviceType() === "LAPTOP" ? Battery() : null;

  return (
    <window
      name="settings-window"
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
      layer={Astal.Layer.TOP}
      exclusivity={Astal.Exclusivity.NORMAL}
    >
      <revealer
        revealChild={bind(isSettingsVisible)}
        transitionType={Gtk.RevealerTransitionType.SLIDE_UP}
      >
        <box
          className="widget_container"
          widthRequest={300}
          orientation={Gtk.Orientation.VERTICAL}
        >
          <box orientation={Gtk.Orientation.HORIZONTAL} hexpand>
            {Cpu()}
            {Memory()}
            {battery}
          </box>
          <box orientation={Gtk.Orientation.HORIZONTAL} hexpand>
            <icon icon={bind(speaker, "volume_icon")}></icon>
            <label
              label={audioVolText}
              className="volume-text"
              halign={Gtk.Align.START}
            />

            <slider
              className="slider"
              orientation={Gtk.Orientation.HORIZONTAL}
              value={bind(speaker, "volume")}
              min={0}
              max={1}
              cursor="pointer"
              step={0.1}
              onDragged={({ value }) => {
                speaker.set_volume(value);
              }}
              hexpand
            />
          </box>
          <box orientation={Gtk.Orientation.HORIZONTAL} hexpand>
            <icon icon={bind(mic, "volume_icon")}></icon>
            <label
              label={micVolText}
              className="volume-text"
              halign={Gtk.Align.START}
            />
            <slider
              className="slider"
              orientation={Gtk.Orientation.HORIZONTAL}
              value={bind(mic, "volume")}
              min={0}
              max={1}
              step={0.1}
              cursor="pointer"
              onDragged={({ value }) => {
                mic.set_volume(value);
              }}
              hexpand
            />
          </box>
        </box>
      </revealer>
    </window>
  );
}

export function Settings() {
  return (
    <button className="settings" onClick={toggleSettingsVisibility}>
      <label label="" className="nf-icon" />
    </button>
  );
}
