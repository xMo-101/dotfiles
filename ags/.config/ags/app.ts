import app from "ags/gtk4/app";
import style from "./style.scss";
import { TopBar } from "./windows/TopBar";

import { PowerWindow } from "./widget/topbar/Power";
// import { SettingsWindow } from "./widget/topbar/Settings";
import { Dock, DockRaiser } from "./widget/dock/Dock";
import { Applauncher } from "./widget/app_launcher/AppLauncher";
import { Notch } from "./widget/topbar/notch/notch";
import { initHyprland } from "./utils/hyprland";

app.start({
  css: style,
  main() {
    // Initialize one instance per monitor
    const launcher = Applauncher();
    const mon = app.get_monitors()[0];
    TopBar(mon);
    PowerWindow();
    // SettingsWindow();
    Notch(mon);
    DockRaiser(mon);
    Dock();
    initHyprland();
  },
});
