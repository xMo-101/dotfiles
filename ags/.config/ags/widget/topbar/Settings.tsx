import { Gtk, createBinding } from "@/utils/imports";
import { Brightness } from "@/utils/brightness";
import Wp from "gi://AstalWp";

export function Settings() {
  const wp = Wp.get_default();
  const speaker = wp?.get_default_speaker();
  const mic = wp?.get_default_microphone();
  const brightness = Brightness.create();
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

  return (
    <menubutton class="button-long">
      <image iconName="preferences-system-symbolic"></image>
      <Gtk.Popover widthRequest={400}>
        <box spacing={4} orientation={Gtk.Orientation.VERTICAL}>
          <box
            orientation={Gtk.Orientation.HORIZONTAL}
            hexpand
            valign={Gtk.Align.CENTER}
          >
            <Gtk.GestureClick
              onPressed={() => speaker?.set_mute(!speaker.get_mute())}
            />
            <slider
              class="slider with-icon"
              orientation={Gtk.Orientation.HORIZONTAL}
              value={createBinding(speaker, "volume")}
              min={0}
              max={1}
              step={0.1}
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
          <box
            orientation={Gtk.Orientation.HORIZONTAL}
            hexpand
            valign={Gtk.Align.CENTER}
          >
            <Gtk.GestureClick
              onPressed={() => mic?.set_mute(!mic.get_mute())}
            />
            <slider
              class="slider with-icon"
              orientation={Gtk.Orientation.HORIZONTAL}
              value={createBinding(mic, "volume")}
              min={0}
              max={1}
              step={0.1}
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

          <box
            orientation={Gtk.Orientation.HORIZONTAL}
            hexpand
            valign={Gtk.Align.CENTER}
          >
            <slider
              class="slider with-icon"
              orientation={Gtk.Orientation.HORIZONTAL}
              min={0}
              max={1}
              step={0.1}
              value={brightness.value}
              onValueChanged={({ value }) => brightness.setBrightness(value)}
              hexpand
            />
            <image
              iconName="display-brightness-symbolic"
              halign={Gtk.Align.START}
              valign={Gtk.Align.CENTER}
              class="slider-icon"
            />
            <label
              label={brightness.text}
              valign={Gtk.Align.CENTER}
              class="volume-text"
            />
          </box>
        </box>
      </Gtk.Popover>
    </menubutton>
  );
}
