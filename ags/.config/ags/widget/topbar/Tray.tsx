import { AstalTray, createBinding, For, Gtk } from "@/utils/imports";

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
    <menubutton class="button-long">
      <image iconName="go-down-symbolic" />
      <Gtk.Popover>
        <Gtk.FlowBox
          homogeneous={true}
          maxChildrenPerLine={3}
          minChildrenPerLine={1}
        >
          <For each={createBinding(trayObject, "items")}>
            {(item) => <TrayItem itemObject={item} />}
          </For>
        </Gtk.FlowBox>
      </Gtk.Popover>
    </menubutton>
  );
}
