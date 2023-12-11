import defaultTheme from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class", '[data-color-theme="dark"]'],
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			backgroundColor: {
				primaryLight: "#ffffff",
				secondaryLight: "#fafafa",
				primaryDark: "#202C36",
				secondaryDark: "#2B3844",
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
