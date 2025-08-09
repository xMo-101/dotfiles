import { Hyprland, createBinding, For } from "@/utils/imports";

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
