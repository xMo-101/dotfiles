import { bind } from "astal";
import Hyprland from "gi://AstalHyprland";

// https://github.com/h0i5/HighBar/blob/main/widget/components/Workspaces/index.tsx

function InactiveWorkspace(props: { id: number }) {
  return (
    <button className="ignore">
      <label label={props.id.toString()} />
    </button>
  );
}

function ActiveWorkspace(props: { id: number }) {
  return (
    <button className="ignore">
      <label label={props.id.toString()} />
    </button>
  );
}

export function WorkspaceView() {
  const hyprland = Hyprland.get_default();
  return (
    <box className="widget_container">
      {bind(hyprland, "workspaces").as((workspaces) => {
        workspaces.sort((a, b) => a.get_id() - b.get_id());
        return (
          <box className="transparent">
            {workspaces.map((workspaces) => {
              return bind(hyprland, "focused_workspace").as(
                (focused_workspace) => {
                  if (focused_workspace.get_id() === workspaces.get_id()) {
                    return (
                      <button
                        onClick={() => {}}
                        className="active-workspace-button ransparent"
                      >
                        <ActiveWorkspace id={focused_workspace.get_id()} />
                      </button>
                    );
                  }
                  return (
                    <button
                      onClick={() => {
                        workspaces.focus();
                      }}
                      className="transparent"
                    >
                      <InactiveWorkspace id={workspaces.get_id()} />
                    </button>
                  );
                },
              );
            })}
          </box>
        );
      })}
    </box>
  );
}
