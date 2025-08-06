import app from "ags/gtk4/app";
import { Astal, Gtk, Gdk } from "ags/gtk4";
import { createState } from "ags";

// IMPORT STACK PAGES
import { Opts } from "./modules/Opts";
import { Mediaplayer } from "./modules/Mediaplayer";
import { Calendar } from "./modules/Calendar";
import { Time } from "./modules/Time";

export function Notch(monitor: Gdk.Monitor) {
  const idlePage = "page-time";
  const PAGES = ["page-calendar", "page-mediaplayer", "page-opts"];
  let currentPage = 0;
  const [visiblePage, setVisiblePage] = createState(idlePage); // start with idle
  const [notchActive, setNotchActive] = createState(false);

  const resetPage = () => (currentPage = 0);
  const initalPage = () => setVisiblePage(PAGES.at(currentPage));
  const idle = () => setVisiblePage(idlePage);
  const nextPage = () => {
    currentPage = (currentPage + 1) % PAGES.length;
    setVisiblePage(PAGES.at(currentPage));
  };
  const prevPage = () => {
    currentPage = (currentPage - 1) % PAGES.length;
    setVisiblePage(PAGES.at(currentPage));
  };
  let win = null;
  let stack = null;

  const [notchClass, setNotchClass] = createState("notch-idle");

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
          setNotchActive(false);
          idle();
          setNotchClass("notch-idle");
          // resetPage();
          win.set_default_size(-1, -1);
        });
        motion.connect("enter", () => {
          setNotchActive(true);
          setNotchClass("notch-active");
          initalPage();
        });
        self.add_controller(motion);
      }}
    >
      <box orientation={Gtk.Orientation.VERTICAL}>
        <box visible={notchActive} orientation={Gtk.Orientation.HORIZONTAL}>
          <button class="button-long" onClicked={prevPage} hexpand={true}>
            <image pixelSize={24} iconName="go-previous-symbolic"></image>
          </button>

          <button class="button-long" onClicked={nextPage} hexpand={true}>
            <image pixelSize={24} iconName="go-next-symbolic"></image>
          </button>
        </box>
        <stack
          hhomogeneous={false}
          vhomogeneous={false}
          hexpand={true}
          vexpand={true}
          interpolate_size={true}
          $={(self) => {
            stack = self;
            self.connect("notify::visible-child", () => {
              win.set_default_size(-1, -1);
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
