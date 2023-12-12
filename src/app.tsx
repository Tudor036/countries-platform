import type { Component } from "solid-js";
import { useRoutes } from "@solidjs/router";

import { routes } from "./routes";
import Header from "./components/header";
import ThemeProvider from "./components/themeProvider";

const App: Component = () => {
	const Route = useRoutes(routes);

	return (
		<ThemeProvider>
			<Header />
			<main class="max-w-[1280px] m-auto p-4 md:p-12 bg-transparent">
				<Route />
			</main>
		</ThemeProvider>
	);
};

export default App;
