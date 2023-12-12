import {
	Accessor,
	ParentComponent,
	Setter,
	createContext,
	createRenderEffect,
} from "solid-js";
import useLocalStorage from "../store/useLocalStorage";

type ThemeType = "light" | "dark";

const preferesMediaTheme = (scheme: ThemeType) =>
	window.matchMedia(`(prefers-color-scheme: ${scheme})`).matches;

let matchedMediaTheme: ThemeType | null = preferesMediaTheme("dark")
	? "dark"
	: preferesMediaTheme("light")
	? "light"
	: null;

const defaultTheme = matchedMediaTheme || "light";

const [theme, setTheme] = useLocalStorage<ThemeType>(
	"color-theme",
	defaultTheme
);

const toggleTheme = () => {
	const newTheme = theme() === "light" ? "dark" : "light";
	setTheme(() => newTheme);
	document.body.setAttribute("data-color-theme", theme());
};

export const ThemeContext = createContext<
	[Accessor<ThemeType>, typeof toggleTheme]
>([theme, toggleTheme]);

const ThemeProvider: ParentComponent = (props) => {
	createRenderEffect(() => {
		if (!document.body.getAttribute("data-color-theme")) {
			document.body.setAttribute("data-color-theme", theme());
		}
	});

	return (
		<ThemeContext.Provider value={[theme, toggleTheme]}>
			{props.children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
