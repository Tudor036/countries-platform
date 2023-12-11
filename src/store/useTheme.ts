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

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	return [theme, toggleTheme] as const;
}
