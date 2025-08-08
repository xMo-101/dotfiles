import { Gtk, createBinding } from "@/utils/imports";
import { Brightness } from "@/utils/brightness";
import { formatFraction } from "@/utils/helper-functions";
import Wp from "gi://AstalWp";

export function Settings() {
  const wp = Wp.get_default();
  const speaker = wp?.get_default_speaker();
  const mic = wp?.get_default_microphone();
  const brightness = Brightness.create();

  const audioVolText = createBinding(speaker, "volume")(formatFraction);
  const micVolText = createBinding(mic, "volume")(formatFraction);

  return (
    <menubutton class="button-long">
      <image iconName="preferences-system-symbolic" />
      <Gtk.Popover widthRequest={400}>
        <box spacing={12} orientation={Gtk.Orientation.VERTICAL}>
          {/* Speaker volume */}
          <box
            orientation={Gtk.Orientation.HORIZONTAL}
            hexpand
            valign={Gtk.Align.CENTER}
          >
            <Gtk.GestureClick
              onPressed={() => speaker?.set_mute(!speaker.get_mute())}
            />
            <image
              iconName={createBinding(speaker, "volume_icon")}
              valign={Gtk.Align.CENTER}
              class="slider-icon"
            />
            <Gtk.Separator orientation={Gtk.Orientation.VERTICAL} />
            <slider
              class="slider"
              orientation={Gtk.Orientation.HORIZONTAL}
              value={createBinding(speaker, "volume")}
              min={0}
              max={1}
              step={0.01}
              onChangeValue={({ value }) => speaker.set_volume(value)}
              hexpand
            />
            <Gtk.Separator orientation={Gtk.Orientation.VERTICAL} />
            <label
              label={audioVolText}
              valign={Gtk.Align.CENTER}
              class="volume-text"
            />
          </box>

          {/* Mic volume */}
          <box
            orientation={Gtk.Orientation.HORIZONTAL}
            hexpand
            valign={Gtk.Align.CENTER}
          >
            <Gtk.GestureClick
              onPressed={() => mic?.set_mute(!mic.get_mute())}
            />
            <image
              iconName={createBinding(mic, "volume_icon")}
              valign={Gtk.Align.CENTER}
              class="slider-icon"
            />
            <Gtk.Separator orientation={Gtk.Orientation.VERTICAL} />
            <slider
              class="slider"
              orientation={Gtk.Orientation.HORIZONTAL}
              value={createBinding(mic, "volume")}
              min={0}
              max={1}
              step={0.1}
              onChangeValue={({ value }) => mic.set_volume(value)}
              hexpand
            />
            <Gtk.Separator orientation={Gtk.Orientation.VERTICAL} />
            <label
              label={micVolText}
              valign={Gtk.Align.CENTER}
              class="volume-text"
            />
          </box>

          {/* Brightness */}
          <box
            orientation={Gtk.Orientation.HORIZONTAL}
            hexpand
            valign={Gtk.Align.CENTER}
          >
            <image
              iconName="display-brightness-symbolic"
              valign={Gtk.Align.CENTER}
              class="slider-icon"
            />
            <Gtk.Separator orientation={Gtk.Orientation.VERTICAL} />
            <slider
              class="slider"
              orientation={Gtk.Orientation.HORIZONTAL}
              min={0}
              max={1}
              step={0.1}
              value={brightness.value}
              onValueChanged={({ value }) => brightness.setBrightness(value)}
              hexpand
            />
            <Gtk.Separator orientation={Gtk.Orientation.VERTICAL} />
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
