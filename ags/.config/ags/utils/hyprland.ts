import app from "ags/gtk4/app";
import AstalHyprland from "gi://AstalHyprland";

const hyprland = AstalHyprland.get_default();

// Default positions (self-contained, no external options)
const ANIMATIONS = {
  bottom: "layerrule animation slide bottom",
  top: "layerrule animation slide top",
  right: "layerrule animation slide right",
  left: "layerrule animation slide left",
};

export const sendBatch = (batch: string[]) => {
  const cmd = batch
    .filter((x) => !!x)
    .map((x) => `keyword ${x}`)
    .join("; ");
  hyprland.message(`[[BATCH]]/${cmd}`);
};

function empty() {
  return Array(1).fill("0");
}
const animations = {
  top: ["settings-window", "notch"],
  bottom: ["dock", "launcher", "powerwindow"],
  right: empty(),
  left: empty(),
};

export function windowAnimation() {
  sendBatch(
    app
      .get_windows()
      // .filter(({ animation }: any) => !!animation)
      .map(({ namespace }: any) => {
        if (animations.top.includes(namespace)) {
          return `${ANIMATIONS.top}, ${namespace}`;
        }
        if (animations.bottom.includes(namespace)) {
          return `${ANIMATIONS.bottom}, ${namespace}`;
        }
        if (animations.right.includes(namespace)) {
          return `${ANIMATIONS.right}, ${namespace}`;
        }
        if (animations.left.includes(namespace)) {
          return `${ANIMATIONS.left}, ${namespace}`;
        }
      }),
  );
}

function windowBlur() {
  const noIgnorealpha = ["verification", "powerwindow", "launcher"];
  sendBatch(
    app
      .get_windows()
      .flatMap(({ namespace }: any) => [
        `layerrule blur, ${namespace}`,
        noIgnorealpha.some((skip) => namespace?.includes(skip))
          ? ""
          : `layerrule ignorealpha 0.3, ${namespace}`,
      ]),
  );
}

export function initHyprland() {
  windowAnimation();
  windowBlur();
  hyprland.connect("config-reloaded", () => {
    windowAnimation();
    windowBlur();
  });
}
