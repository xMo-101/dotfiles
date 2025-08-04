import { Astal } from "ags/gtk4";
import Gtk from "gi://Gtk?version=4.0";
import Mpris from "gi://AstalMpris";
import { bind } from "astal"; // TODO:

function lengthStr(length: number) {
  const min = Math.floor(length / 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor(length % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
}

export function MediaPlayer({ player }: { player: Mpris.Player | null }) {
  const { START, END } = Gtk.Align;

  if (!player) {
    return (
      <box className="MediaPlayer placeholder" spacing={4} margin={8} vertical>
        <box className="cover-art placeholder-icon">
          <icon icon="multimedia-player-symbolic" />
        </box>
        <label
          className="title placeholder-text"
          label="Kein Player aktiv"
          halign={START}
        />
        <label
          className="artist placeholder-subtext"
          label="Keine Wiedergabe"
          halign={START}
        />
      </box>
    );
  }

  const title = bind(player, "title").as((t) => t || "Unknown Track");
  const artist = bind(player, "artist").as((a) => a || "Unknown Artist");
  const coverArt = bind(player, "coverArt").as(
    (c) => `background-image: url('${c}')`,
  );
  const playerIcon = player.entry ?? "audio-x-generic-symbolic";

  const position = bind(player, "position").as((p) =>
    player.length > 0 ? p / player.length : 0,
  );
  const playIcon = bind(player, "playbackStatus").as((s) =>
    s === Mpris.PlaybackStatus.PLAYING
      ? "media-playback-pause-symbolic"
      : "media-playback-start-symbolic",
  );

  return (
    <box className="MediaPlayer" spacing={6} margin={8} vertical>
      {/* Cover Art at Top */}
      <box className="cover-art" css={coverArt} />

      {/* Title & artist below cover */}
      <box vertical spacing={2} marginTop={2}>
        <box className="MediaTitle-Container" spacing={4}>
          <label
            className="title"
            tooltip_text={title}
            truncate
            hexpand
            halign={START}
            label={title}
          />
          <icon className="playericon" name={playerIcon} />
        </box>
        <label wrap className="artist" label={artist} tooltip_text={artist} />
      </box>

      {/* Slider */}
      <slider
        className="slider"
        cursor="pointer"
        marginTop={2}
        marginBottom={2}
        visible={bind(player, "length").as((l) => l > 0)}
        onDragged={({ value }) => (player.position = value * player.length)}
        value={position}
      />

      {/* Controls at Bottom */}
      <centerbox className="actions" spacing={6} marginTop={2}>
        <label
          className="position"
          halign={START}
          visible={bind(player, "length").as((l) => l > 0)}
          label={bind(player, "position").as(lengthStr)}
        />
        <box className="controls transparent" spacing={6}>
          <button
            cursor="pointer"
            onClicked={() => player.previous()}
            visible={bind(player, "canGoPrevious")}
          >
            <icon icon="media-skip-backward-symbolic" />
          </button>
          <button
            cursor="pointer"
            onClicked={() => player.play_pause()}
            visible={bind(player, "canControl")}
          >
            <icon icon={playIcon} />
          </button>
          <button
            cursor="pointer"
            onClicked={() => player.next()}
            visible={bind(player, "canGoNext")}
          >
            <icon icon="media-skip-forward-symbolic" />
          </button>
        </box>
        <label
          className="length"
          halign={END}
          visible={bind(player, "length").as((l) => l > 0)}
          label={bind(player, "length").as((l) =>
            l > 0 ? lengthStr(l) : "0:00",
          )}
        />
      </centerbox>
    </box>
  );
}
