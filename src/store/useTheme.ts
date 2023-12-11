import { createRenderEffect } from "solid-js";
import useLocalStorage from "./useLocalStorage";

type ThemeType = "light" | "dark";

const preferesMediaTheme = (scheme: ThemeType) =>
	window.matchMedia(`(prefers-color-scheme: ${scheme})`).matches;

let matchedMediaTheme: ThemeType | null = preferesMediaTheme("dark")
	? "dark"
	: preferesMediaTheme("light")
	? "light"
	: null;

const defaultTheme = matchedMediaTheme || "light";

export default function useTheme() {
	const [theme, setTheme] = useLocalStorage<ThemeType>(
		"color-theme",
		defaultTheme
	);

	createRenderEffect(() => {
		document.body.setAttribute("data-color-theme", theme());
	});

	const toggleTheme = () => {
		const newTheme = theme() === "light" ? "dark" : "light";
		setTheme(() => newTheme);
		document.body.setAttribute("data-color-theme", theme());
	};

	return [theme, toggleTheme] as const;
}
