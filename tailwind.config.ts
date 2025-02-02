import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
		"shadow-darkTheme",
		"shadow-card",
		"rounded-none",
		"rounded-tl-[90px] ",
		"rounded-br-[90px]",
		"rounded-tr-[90px]", "rounded-bl-[90px]", "top-[-40px] right-[-40px]", "bottom-0 left-[-10px]",
		"right-[-20px]", "left-[-25px]", "bottom-[-20px] left-[25%]", "left-[-20px]", "top-[-30px]"
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
