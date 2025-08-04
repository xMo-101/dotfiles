import Mpris from "gi://AstalMpris";
import Gtk from "gi://Gtk?version=4.0";
import { createBinding } from "ags";

function lengthStr(length: number) {
  const min = Math.floor(length / 60).toString();
  const sec = Math.floor(length % 60)
    .toString()
    .padStart(2, "0");
  return min + ":" + sec;
}

function truncate(str: String, max: number) {
  return str.length > max ? str.substring(0, max) + "…" : str;
}

function mprisStateIcon(status: Mpris.PlaybackStatus): string {
  return status === Mpris.PlaybackStatus.PLAYING
    ? "media-playback-pause-symbolic"
    : "media-playback-start-symbolic";
}

//function togglePlaying

export function Mediaplayer() {
  const mpris = Mpris.get_default();
  const player = mpris.get_players().at(0);

  const artist = createBinding(player, "artist"); // track artist
  const title = createBinding(player, "title"); // track title
  const coverArt = createBinding(player, "cover-art");
  const length = createBinding(player, "length")(lengthStr); // length of track
  const position = createBinding(player, "position")(lengthStr); // played length of track
  return (
    <box $type="named" name="page-mediaplayer">
      <box orientation={Gtk.Orientation.HORIZONTAL}>
        <box valign={Gtk.Align.CENTER}>
          <image
            class="cover"
            overflow={Gtk.Overflow.HIDDEN}
            file={coverArt}
          ></image>
        </box>
        <box valign={Gtk.Align.CENTER} orientation={Gtk.Orientation.VERTICAL}>
          <label label={title((t) => truncate(t, 20))} tooltip_text={title} />
          <label label="by" />
          <label label={artist} />
          <centerbox orientation={Gtk.Orientation.HORIZONTAL}>
            <label $type="start" label={position} />
            <box $type="center" orientation={Gtk.Orientation.HORIZONTAL}>
              <button onClicked={() => player?.pause}>
                <image
                  iconName={createBinding(
                    player,
                    "playback_status",
                  )(mprisStateIcon)}
                />
              </button>
            </box>
            <label $type="end" label={length} />
          </centerbox>
        </box>
      </box>
    </box>
  );
}
