import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [],
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"],
  },
  darkMode: ['class', '[data-theme="dark"]']
} satisfies Config;
