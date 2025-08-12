import { Gtk, Gdk, createState, Astal } from "@/utils/imports";
import app from "ags/gtk4/app";

import { Opts } from "./modules/Opts";
import { Mediaplayer } from "./modules/Mediaplayer";
import { Calendar } from "./modules/Calendar";
import { Time } from "./modules/Time";

import AstalNotifd from "gi://AstalNotifd?version=0.1";
import { Notification } from "./modules/Notification";

function handleNotifications(stack: Gtk.Stack, Notifd: AstalNotifd.Notifd) {
  const pageName = "page-notifs";
  const NotificationsContainer: Gtk.Box = (
    <box
      $type="name"
      name={pageName}
      class={"notif-container"}
      orientation={Gtk.Orientation.VERTICAL}
    />
  );

  // add NotificationsContainer just once
  if (!stack.get_child_by_name(pageName)) {
    stack.add_named(NotificationsContainer, pageName);
  }

  Notifd.connect("notified", (_, id: number) => {
    const notif = Notifd.get_notification(id);
    if (!notif) return;

    const widget = <Notification NotificationObject={notif} />;
    NotificationsContainer.append(widget);

    // show notifications page
    stack.set_visible_child_name(pageName);

    // per-notification timeout with sane fallback
    let expireIn = notif.get_expire_timeout(); // usually ms; may be 0 / -1
    if (expireIn == null || expireIn <= 0) expireIn = 5000;

    setTimeout(() => {
      // remove just this widget
      if (widget.get_parent()) NotificationsContainer.remove(widget);

      // only go back to idle if no notifications remain
      if (NotificationsContainer.get_first_child() === null) {
        stack.set_visible_child_name("page-time");
      }
    }, expireIn);
  });
}

export function Notch(monitor: Gdk.Monitor) {
  const Notifd = AstalNotifd.get_default();
  const idlePage = "page-time";
  const PAGES = ["page-calendar", "page-mediaplayer", "page-opts"];
  let currentPage = 0;

  const [visiblePage, setVisiblePage] = createState(idlePage);
  const [notchActive, setNotchActive] = createState(false);
  const [notchClass, setNotchClass] = createState("notch-idle");

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
        <Gtk.Stack
          hhomogeneous={false}
          vhomogeneous={false}
          hexpand
          vexpand
          interpolate_size
          $={(self) => {
            setStackRef(self);
            self.connect("notify::visible-child", () => {
              win?.set_default_size(-1, -1);
            });
            handleNotifications(self, Notifd);
          }}
          visibleChildName={visiblePage}
        >
          <Time name="page-time" title="time" />
          <Calendar name="page-calendar" title="calendar" />
          <Mediaplayer name="page-mediaplayer" title="Media" />
          <Opts name="page-opts" title="opts" />
        </Gtk.Stack>
      </box>
    </window>
  );
}
