import { app, Gtk, Gdk, createState, Astal } from "@/utils/imports";

// IMPORT STACK PAGES
import { Opts } from "./modules/Opts";
import { Mediaplayer } from "./modules/Mediaplayer";
import { Calendar } from "./modules/Calendar";
import { Time } from "./modules/Time";

export function Notch(monitor: Gdk.Monitor) {
  const idlePage = "page-time";
  const PAGES = ["page-calendar", "page-mediaplayer", "page-opts"];
  let currentPage = 0;

  const [visiblePage, setVisiblePage] = createState(idlePage);
  const [notchActive, setNotchActive] = createState(false);
  const [notchClass, setNotchClass] = createState("notch-idle");

  const initalPage = () => setVisiblePage(PAGES.at(currentPage));
  const idle = () => setVisiblePage(idlePage);

  const nextPage = () => {
    currentPage = (currentPage + 1) % PAGES.length;
    setVisiblePage(PAGES.at(currentPage));
  };

  const prevPage = () => {
    currentPage = (currentPage - 1 + PAGES.length) % PAGES.length;
    setVisiblePage(PAGES.at(currentPage));
  };

  let win: Gtk.Window | null = null;
  let stack: Gtk.Stack | null = null;

  return (
    <window
      application={app}
      name="notch"
      namespace="notch"
      gdkmonitor={monitor}
      visible={true}
      exclusivity={Astal.Exclusivity.IGNORE}
      // keymode={Astal.Keymode.ON_DEMAND}
      anchor={Astal.WindowAnchor.TOP}
      class={notchClass}
      $={(self) => {
        win = self;

        const motion = new Gtk.EventControllerMotion();
        motion.connect("leave", () => {
          self.keymode = Astal.Keymode.NONE; // prevent keyboard input without hover
          setNotchActive(false);
          idle();
          setNotchClass("notch-idle");
          win?.set_default_size(-1, -1);
        });
        motion.connect("enter", () => {
          self.keymode = Astal.Keymode.ON_DEMAND; // accept keyboard input
          setNotchActive(true);
          setNotchClass("notch-active");
          initalPage();
        });
        self.add_controller(motion);

        // Keyboard controller: space = next page, shift+space = prev page
        const key = new Gtk.EventControllerKey();
        key.connect("key-pressed", (_ctrl, keyval, _keycode, state) => {
          if (keyval === Gdk.KEY_space) {
            if (state & Gdk.ModifierType.SHIFT_MASK) prevPage();
            else nextPage();
            return true; // handled
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
            stack = self;
            self.connect("notify::visible-child", () => {
              win?.set_default_size(-1, -1);
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
