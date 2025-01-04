import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        body: '#ffffff',
				king: '#645728',
				dark: '#2b2712',
				coral: '#aa9636',
				light: '#bfa783',
				second: '#595152',
      },
    },
  },
  plugins: [],
} satisfies Config;
