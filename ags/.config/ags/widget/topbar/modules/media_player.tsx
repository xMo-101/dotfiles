import { Astal, Gtk } from "astal/gtk3";
import Mpris from "gi://AstalMpris";
import { bind } from "astal";

function lengthStr(length: number) {
  const min = Math.floor(length / 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor(length % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
}

export function MediaPlayer({ player }: { player: Mpris.Player }) {
  const { START, END } = Gtk.Align;

  const title = bind(player, "title").as((t) => t || "Unknown Track");

  const artist = bind(player, "artist").as((a) => a || "Unknown Artist");

  const coverArt = bind(player, "coverArt").as(
    (c) => `background-image: url('${c}')`,
  );

  // const playerIcon = bind(player, "entry");
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
    <box className="MediaPlayer">
      <box className="cover-art" css={coverArt} />
      <box className="playerinfo" vertical>
        <box>
          <label
            className="title"
            truncate
            hexpand
            halign={START}
            label={title}
          />
          <icon className="playericon" name={playerIcon} />
        </box>
        <label
          halign={START}
          valign={START}
          vexpand
          wrap
          className="artist"
          label={artist}
        />
        <slider
          className="slider"
          cursor="pointer"
          visible={bind(player, "length").as((l) => l > 0)}
          onDragged={({ value }) => (player.position = value * player.length)}
          value={position}
        />
        <centerbox className="actions">
          <label
            hexpand
            className="position"
            halign={START}
            visible={bind(player, "length").as((l) => l > 0)}
            label={bind(player, "position").as(lengthStr)}
          />
          <box className="controls">
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
            hexpand
            halign={END}
            visible={bind(player, "length").as((l) => l > 0)}
            label={bind(player, "length").as((l) =>
              l > 0 ? lengthStr(l) : "0:00",
            )}
          />
        </centerbox>
      </box>
    </box>
  );
}
