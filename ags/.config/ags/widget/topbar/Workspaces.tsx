import Hyprland from "gi://AstalHyprland";
import { createBinding, For } from "ags";

// TODO: Hitting CTRL+C while this is running causes errors:
// (gjs:8103): Gjs-CRITICAL **: 16:15:54.761: Object Astal.Button (0x557e674e18f0), has been already disposed — impossible to access it. This might be caused by the object having been destroyed from C code using something such as destroy(), dispose(), or remove() vfuncs.
export function WorkspaceView() {
  const hyprland = Hyprland.get_default();

  // WORKSPACEBUTTON ELEMENT
  const WorkspaceButton = (props: {
    visible: boolean;
    id: number;
    isActive: boolean;
  }) => {
    const classBinding = createBinding(
      hyprland,
      "focused_workspace",
    )((fws) => {
      return props.id === fws.id ? "button-special" : "button-small";
    });
    return (
      <button
        visible={props.visible}
        class={classBinding}
        label={props.id.toString()}
        onClicked={() => hyprland.message(`dispatch workspace ${props.id}`)}
      />
    );
  };

  // GET WORKSPACE DATA (MATSHELL)
  const workspaceButtons = createBinding(
    hyprland,
    "workspaces",
  )((wss) => {
    const activeWorkspaces = wss
      // .filter((ws) => !(ws.id >= -99 && ws.id <= -2))
      .sort((a, b) => a.id - b.id);

    const maxId = activeWorkspaces[activeWorkspaces.length - 1]?.id || 1;

    return [...Array(10)].map((_, i) => {
      const id = i + 1;
      const ws = activeWorkspaces.find((w) => w.id === id);

      return {
        id,
        workspace: ws,
        visible: maxId >= id,
        isActive: ws !== undefined,
      };
    });
  });

  // RENDER WORKSPACES DYNAMICALLY
  return (
    <box>
      <For each={workspaceButtons}>
        {(ws) => (
          <WorkspaceButton
            visible={ws.visible}
            id={ws.id}
            isActive={ws.isActive}
          />
        )}
      </For>
    </box>
  );
}
