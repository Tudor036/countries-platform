import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class", '[data-color-theme="dark"]'],
	content: ["./index.html", "./src/**/*.tsx"],
	theme: {
		extend: {
			backgroundColor: {
				primaryLight: "#ffffff",
				secondaryLight: "#fafafa",
				primaryDark: "#2B3844",
				secondaryDark: "#202C36",
			},
			colors: {
				primaryLight: "#111517",
				secondatyLight: "#848484",
			},
			fontFamily: {
				sans: [
					"'Nunito Sans', sans-serif",
					...defaultTheme.fontFamily.sans,
				],
			},
			fontWeight: {
				heading: "800",
				body: "600",
				detail: "300",
			},
		},
	},
	plugins: [],
};

export default config;
