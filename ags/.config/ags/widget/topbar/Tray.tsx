import AstalTray from "gi://AstalTray?version=0.1";
import { bind } from "astal";
import { Gtk } from "astal/gtk3";

export function Tray() {
  const tray = AstalTray.get_default();
  if (!tray) return <box className="ignore transparent" />;

  return (
    <box
      className={"widget_container"}
      orientation={Gtk.Orientation.HORIZONTAL}
    >
      {bind(tray, "items").as((items = []) =>
        items.map((item) => (
          <menubutton
            className={"transparent"}
            tooltipMarkup={bind(item, "tooltipMarkup")}
            usePopover={false}
            actionGroup={bind(item, "actionGroup").as((ag) => ["dbusmenu", ag])}
            menuModel={bind(item, "menuModel")}
          >
            <icon gicon={bind(item, "gicon")} />
          </menubutton>
        )),
      )}
    </box>
  );
}
