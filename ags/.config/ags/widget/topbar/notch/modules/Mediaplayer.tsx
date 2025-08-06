import { createBinding, For, Gtk, Mpris } from "@/utils/imports";

function lengthStr(length?: number): string {
  if (typeof length !== "number" || length < 0) return "0:00";
  const min = Math.floor(length / 60).toString();
  const sec = Math.floor(length % 60)
    .toString()
    .padStart(2, "0");
  return `${min}:${sec}`;
}

function truncate(str?: string, max: number = 30): string {
  if (!str) return "Unknown";
  return str.length > max ? str.substring(0, max) + "…" : str;
}

function mprisStateIcon(status?: Mpris.PlaybackStatus): string {
  return status === Mpris.PlaybackStatus.PLAYING
    ? "media-playback-pause-symbolic"
    : "media-playback-start-symbolic";
}

function TrackInfo({ player }: { player: Mpris.Player }) {
  const title = createBinding(player, "title")(truncate);
  const artist = createBinding(player, "artist")(truncate);

  return (
    <box orientation={Gtk.Orientation.VERTICAL}>
      <label label={title} class="title" xalign={0} />
      <label label={artist} class="artist" xalign={0} />
    </box>
  );
}

function ProgressBar({ player }: { player: Mpris.Player }) {
  return (
    <slider
      value={createBinding(
        player,
        "position",
      )(() => player.get_position() / player.get_length())}
      min={0}
      max={1}
      onChangeValue={({ value }) => {
        const len = player.get_length();
        if (len >= 0) player.set_position(Math.floor(value * len));
      }}
    />
  );
}

function Controls({ player }: { player: Mpris.Player }) {
  return (
    <box orientation={Gtk.Orientation.HORIZONTAL}>
      <button
        visible={createBinding(
          player,
          "can_go_previous",
        )((i) => (i === true ? true : false))}
        class="button-long"
        onClicked={() => player.previous()}
      >
        <image iconName="media-skip-backward-symbolic"></image>
      </button>
      <button
        class="button-long"
        valign={Gtk.Align.CENTER}
        onClicked={() => player.play_pause()}
      >
        <image
          iconName={createBinding(player, "playback_status")(mprisStateIcon)}
          pixelSize={24}
        />
      </button>

      <button
        visible={createBinding(
          player,
          "can_go_next",
        )((i) => (i === true ? true : false))}
        class="button-long"
        onClicked={() => player.next()}
      >
        <image iconName="media-skip-backward-symbolic"></image>
      </button>
    </box>
  );
}

function TimeInfo({ player }: { player: Mpris.Player }) {
  return (
    <box orientation={Gtk.Orientation.HORIZONTAL} spacing={8} marginTop={6}>
      <label label={createBinding(player, "position")(lengthStr)} xalign={0} />
      <box hexpand />
      <Controls player={player} />
      <box hexpand />
      <label label={createBinding(player, "length")(lengthStr)} xalign={1} />
    </box>
  );
}

function MusicBox({ player }: { player: Mpris.Player | null | undefined }) {
  if (!player)
    return (
      <box class="mediaplayer-card">
        <label label="No Player" xalign={0.5} />
      </box>
    );

  return (
    <box
      class="mediaplayer-card"
      orientation={Gtk.Orientation.VERTICAL}
      spacing={6}
      marginTop={8}
      marginBottom={8}
      marginStart={12}
      marginEnd={12}
    >
      <TrackInfo player={player} />
      <ProgressBar player={player} />
      <TimeInfo player={player} />
    </box>
  );
}

export function Mediaplayer() {
  const mpris = Mpris.get_default();
  const players = createBinding(mpris, "players").as((p) =>
    (p || []).filter((pl) => !!pl),
  );

  return (
    <box
      $type="named"
      name="page-mediaplayer"
      orientation={Gtk.Orientation.VERTICAL}
      spacing={10}
    >
      <For each={players}>{(plr) => <MusicBox player={plr} />}</For>
    </box>
  );
}
