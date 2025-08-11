import { Gtk, Gdk, createState, Astal } from "@/utils/imports";
import app from "ags/gtk4/app";

import { Opts } from "./modules/Opts";
import { Mediaplayer } from "./modules/Mediaplayer";
import { Calendar } from "./modules/Calendar";
import { Time } from "./modules/Time";
import { NotificationPopup } from "./modules/NotificationPopup";

import AstalNotifd from "gi://AstalNotifd?version=0.1";
import { Notification } from "./modules/Notification";

export function Notch(monitor: Gdk.Monitor) {
  const Notifd = AstalNotifd.get_default();
  const idlePage = "page-time";
  const PAGES = ["page-calendar", "page-mediaplayer", "page-opts"];
  let currentPage = 0;

  const [visiblePage, setVisiblePage] = createState(idlePage);
  const [notchActive, setNotchActive] = createState(false);
  const [notchClass, setNotchClass] = createState("notch-idle");

  // NEW: reactive ref for the Gtk.Stack
  const [stackRef, setStackRef] = createState<Gtk.Stack | null>(null);

  const initialPage = () => setVisiblePage(PAGES.at(currentPage)!);
  const idle = () => setVisiblePage(idlePage);

  const nextPage = () => {
    currentPage = (currentPage + 1) % PAGES.length;
    setVisiblePage(PAGES.at(currentPage)!);
  };

  const prevPage = () => {
    currentPage = (currentPage - 1 + PAGES.length) % PAGES.length;
    setVisiblePage(PAGES.at(currentPage)!);
  };

  let win: Gtk.Window | null = null;

  return (
    <window
      application={app}
      name="notch"
      namespace="notch"
      gdkmonitor={monitor}
      visible={true}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={Astal.WindowAnchor.TOP}
      class={notchClass}
      $={(self) => {
        win = self;

        const motion = new Gtk.EventControllerMotion();
        motion.connect("leave", () => {
          self.keymode = Astal.Keymode.NONE;
          setNotchActive(false);
          idle();
          setNotchClass("notch-idle");
          win?.set_default_size(-1, -1);
        });
        motion.connect("enter", () => {
          self.keymode = Astal.Keymode.ON_DEMAND;
          setNotchActive(true);
          setNotchClass("notch-active");
          initialPage();
        });
        self.add_controller(motion);

        const key = new Gtk.EventControllerKey();
        key.connect("key-pressed", (_ctrl, keyval, _keycode, state) => {
          if (keyval === Gdk.KEY_space) {
            if (state & Gdk.ModifierType.SHIFT_MASK) prevPage();
            else nextPage();
            return true;
          }
          return false;
        });
        self.add_controller(key);
      }}
    >
      <box orientation={Gtk.Orientation.VERTICAL}>
        <stack
          hhomogeneous={false}
          vhomogeneous={false}
          hexpand
          vexpand
          interpolate_size
          $={(self) => {
            // assign into reactive state so dependents get updated
            setStackRef(self);
            self.connect("notify::visible-child", () => {
              win?.set_default_size(-1, -1);
            });

            // NOTIFICATIONS
            Notifd.connect("notified", (_, id) => {
              const NotifObject = Notifd.get_notification(id);
              const NotificationTSX = (
                <Notification NotificationObject={NotifObject} />
              );
              self.add_named(NotificationTSX, "lol");
              self.set_visible_child_name("lol");
              setTimeout(() => {
                self.remove(NotificationTSX);
                self.set_visible_child_name("page-time");
              }, 1500);
            });
          }}
          visibleChildName={visiblePage}
        >
          <Time name="page-time" title="time" />
          <Calendar name="page-calendar" title="calendar" />
          <Mediaplayer name="page-mediaplayer" title="Media" />
          <Opts name="page-opts" title="opts" />
        </stack>
      </box>
    </window>
  );
}
