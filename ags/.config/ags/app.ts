import { App } from "astal/gtk3";
import style from "./style.scss";
import { TopBar } from "./windows/TopBar";
import { NotificationWindow } from "./widget/topbar/NotificationCenter";
import { PowerWindow } from "./widget/topbar/Power";
import { Settings, SettingsWindow } from "./widget/topbar/Settings";
import NotificationPopups from "./windows/Notifications";

App.start({
  css: style,
  main() {
    App.get_monitors().map(TopBar);
    App.get_monitors().map(NotificationWindow);
    App.get_monitors().map(Settings);
    App.get_monitors().map(SettingsWindow);
    App.get_monitors().map(NotificationPopups);
    App.get_monitors().map(PowerWindow);
    const power = PowerWindow();
  },
});
