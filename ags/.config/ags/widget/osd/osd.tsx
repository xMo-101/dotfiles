// import { App, Gtk, Astal } from "astal/gtk3";
// import { timeout, Variable } from "astal";
//
// const osdText = Variable(""); // what to display
// const osdVisible = Variable(false); // whether it's visible
//
// export function showOSD(text: string, duration = 1500) {
//   osdText.set(text);
//   osdVisible.set(true);
//
//   // Auto-hide after `duration` ms
//   timeout(duration, () => osdVisible.set(false));
// }
//
// export function OSDWindow() {
//   return (
//     <window
//       name="osd-window"
//       namespace="osd"
//       layer={Astal.Layer.OVERLAY} // on top of everything
//       visible={osdVisible()}
//       exclusivity={Astal.Exclusivity.IGNORE}
//       acceptFocus={false}
//       focusOnMap={false}
//       widthRequest={300}
//       heightRequest={50}
//     >
//       <box
//         orientation={Gtk.Orientation.HORIZONTAL}
//         halign={Gtk.Align.CENTER}
//         valign={Gtk.Align.CENTER}
//         cssClasses={["osd-container"]}
//         spacing={8}
//       >
//         <label label={osdText()} cssClasses={["osd-text"]} />
//       </box>
//     </window>
//   );
// }
