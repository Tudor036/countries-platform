import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

import Home from "./pages/home";
import CountryData from "./pages/country.data";

export const routes: RouteDefinition[] = [
	{
		path: "/",
		component: Home,
	},
	{
		path: "/:country",
		component: lazy(() => import("./pages/country")),
		data: CountryData,
	},
];
