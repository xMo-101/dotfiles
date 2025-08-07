import { exec, createState } from "@/utils/imports";

function getInitBrightness(): number {
  const current = Number(exec("brightnessctl get"));
  const max = Number(exec("brightnessctl max"));
  return current / max;
}

function formatFraction(fraction: number): string {
  return (fraction * 100).toFixed(0).padStart(3, " ") + "%";
}

export const Brightness = {
  create() {
    const obj = Object.create(this);
    [obj.value, obj.setValue] = createState(getInitBrightness());
    [obj.text, obj.setText] = createState(formatFraction(obj.value));

    obj.setBrightness = (percent: number) => {
      const clamped = Math.max(0.01, Math.min(1, percent));
      exec(`brightnessctl set ${Math.floor(clamped * 100)}%`);
      obj.setValue(clamped);
      obj.setText(formatFraction(clamped));
    };

    return obj;
  },
};
