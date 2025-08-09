import { createState, For, Gtk, Astal, Apps } from "@/utils/imports";
import app from "ags/gtk4/app";

const MAX_ITEMS = 8;

function AppButton({ myApp }: { myApp: Apps.Application }) {
  return (
    <button
      onClicked={() => {
        myApp.launch();
        app.toggle_window("launcher");
      }}
      class="surface-0 button-app"
    >
      <box spacing={10} class={"transparent"}>
        <image iconName={myApp.iconName} pixelSize={32} />
        <box
          class="transparent"
          valign={Gtk.Align.CENTER}
          orientation={Gtk.Orientation.VERTICAL}
        >
          <label class="name" ellipsize={true} xalign={0} label={myApp.name} />
        </box>
      </box>
    </button>
  );
}

export function Applauncher() {
  const apps = new Apps.Apps({
    nameMultiplier: 3,
    executableMultiplier: 2,
    entryMultiplier: 2,
  });

  const [query, setQuery] = createState("");
  const list = query((q) => apps.fuzzy_query(q).slice(0, MAX_ITEMS));
  const hide = () => {
    if (app.get_window("launcher")?.visible) {
      app.toggle_window("launcher");
    }
  };

  function openfirst() {
    const first = list.get()[0];
    if (first && first.launch()) {
      hide();
    }
  }

  return (
    <window
      name="launcher"
      namespace="launcher"
      $={(self) => app.add_window(self)}
      exclusivity={Astal.Exclusivity.IGNORE}
      resizable={true}
      layer={Astal.Layer.TOP}
      keymode={Astal.Keymode.ON_DEMAND}
      application={app}
      visible={false}
      onShow={() => setQuery("")}
      class="window-launcher glassy"
    >
      <box>
        <box
          class={"transparent"}
          hexpand={false}
          orientation={Gtk.Orientation.VERTICAL}
        >
          <box
            widthRequest={500}
            orientation={Gtk.Orientation.VERTICAL}
            class="transparent"
          >
            <entry
              placeholderText="Search"
              class="surface-1"
              onChanged={({ text }) => setQuery(text)}
              onActivate={() => {
                if (query((q) => q) !== "") openfirst();
              }}
              text={query}
            />
            <box class={"transparent"} orientation={Gtk.Orientation.VERTICAL}>
              <For each={list}>{(myApp) => <AppButton myApp={myApp} />}</For>
            </box>
            <centerbox
              hexpand={true}
              vexpand={true}
              class={"transparent"}
              visible={list((l) => l.length === 0)}
            >
              <image
                $type="center"
                pixelSize={128}
                iconName="process-error-symbolic"
              />
            </centerbox>
          </box>
        </box>
      </box>
    </window>
  );
}
