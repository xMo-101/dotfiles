import { App, Astal, astalify, Gtk, type ConstructProps } from "astal/gtk3";
import GLib from "gi://GLib";
import GObject from "gi://GObject";
import { Variable, bind } from "astal";
import { MediaPlayer } from "./modules/media_player";
import Notifd from "gi://AstalNotifd";
import Mpris from "gi://AstalMpris";

const mpris = Mpris.get_default();
const currentPlayer = bind(mpris, "players").as(
  (players) => players[0] ?? null,
);
const notifd = Notifd.get_default();

notifd.connect("notified", (_, id) => {
  const n = notifd.get_notification(id);
  print(n.summary, n.body);
});

const time = Variable("").poll(60_000, "date '+%H:%M'");
const date = Variable("").poll(60_000, "date '+%d.%m.%Y'");
const timedate = Variable("").poll(60_000, "date '+%H:%M   %d.%m.%Y'");

const isCenterVisible = Variable(false);

class Calendar extends astalify(Gtk.Calendar) {
  static {
    GObject.registerClass(this);
  }

  constructor(
    props: ConstructProps<
      Gtk.Calendar,
      Gtk.Calendar.ConstructorProps,
      { onColorSet: [] } // signals of Gtk.ColorButton have to be manually typed
    >,
  ) {
    super(props as any);
  }
}

function toggleCenterVisibility() {
  isCenterVisible.set(!isCenterVisible.get());
}

export function TimeButton() {
  return (
    <button
      className="widget_container"
      onClicked={toggleCenterVisibility}
      label={timedate()}
      orientation={Gtk.Orientation.HORIZONTAL}
      halign={Gtk.Align.CENTER}
    ></button>
  );
}

export function NotificationWindow() {
  return (
    <window
      name="notification"
      anchor={Astal.WindowAnchor.TOP}
      exclusivity={Astal.Exclusivity.NORMAL}
      layer={Astal.Layer.OVERLAY}
      className="widget_container"
    >
      <revealer
        revealChild={bind(isCenterVisible)}
        transitionType={Gtk.RevealerTransitionType.SLIDE_UP}
      >
        <box
          className="notification-center"
          orientation={Gtk.Orientation.HORIZONTAL}
        >
          <box orientation={Gtk.Orientation.VERTICAL} halign={Gtk.Align.START}>
            {currentPlayer.as((player) =>
              player ? (
                <MediaPlayer player={player} />
              ) : (
                <box
                  className="no-player"
                  hexpand={true}
                  halign={Gtk.Align.CENTER}
                  valign={Gtk.Align.CENTER}
                >
                  <label label=" Kein Player aktiv" />
                </box>
              ),
            )}
            <box>
              <button
                tooltipText="Screenshot"
                onClicked={() =>
                  GLib.spawn_command_line_async(
                    `${GLib.get_home_dir()}/.config/hypr/hyprshot.sh`,
                  )
                }
              >
                <label label="󰹑" />
              </button>
              <button tooltipText="Open something else">
                <label label="" />
              </button>
            </box>
          </box>

          <box
            className="calendar-section"
            orientation={Gtk.Orientation.VERTICAL}
            valign={Gtk.Align.START}
          >
            <Calendar className="calendar" />
          </box>
        </box>
      </revealer>
    </window>
  );
}
