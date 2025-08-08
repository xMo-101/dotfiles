import AstalTray from "gi://AstalTray";
import { For, createBinding } from "ags";

function TrayItem({ itemObject }) {
  return (
    <menubutton
      $={(_self) => {
        _self.menuModel = itemObject.menuModel;
        _self.insert_action_group("dbusmenu", itemObject.actionGroup);
        itemObject.connect("notify::action-group", () => {
          _self.insert_action_group("dbusmenu", itemObject.actionGroup);
        });
      }}
      class="button-long"
      tooltipMarkup={createBinding(itemObject, "tooltip_markup")}
    >
      <image class="icon" gicon={createBinding(itemObject, "gicon")} />
    </menubutton>
  );
}

export function Tray() {
  const trayObject = AstalTray.get_default();
  return (
    <box homogeneous={true} class="transparent">
      <For each={createBinding(trayObject, "items")}>
        {(item) => <TrayItem itemObject={item} />}
      </For>
    </box>
  );
}
