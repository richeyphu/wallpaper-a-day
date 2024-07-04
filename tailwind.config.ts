import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [],
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"],
  },
} satisfies Config;
