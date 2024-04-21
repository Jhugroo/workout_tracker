import {nextui} from '@nextui-org/theme';
import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|button|card|chip|divider|input|modal|table|tabs|ripple|spinner|checkbox|spacer).js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
