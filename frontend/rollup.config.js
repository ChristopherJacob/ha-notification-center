import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: "src/notification-center-panel.ts",
    output: {
      file: "dist/notification-center-panel.js",
      format: "es",
      sourcemap: !production,
    },
    plugins: [resolve(), typescript()],
  },
  {
    input: "src/notification-center-card.ts",
    output: {
      file: "dist/notification-center-card.js",
      format: "es",
      sourcemap: !production,
    },
    plugins: [resolve(), typescript()],
  },
];
