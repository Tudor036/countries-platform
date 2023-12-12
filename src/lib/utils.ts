import { useSearchParams } from "@solidjs/router";
import { Country, THomeSearchParams } from "./types";
import { createMemo } from "solid-js";

export const getHomeUrl = () => {
	const [searchParams] = useSearchParams<THomeSearchParams>();
	const currentUrl = createMemo(() => {
		if (searchParams.region || searchParams.search) {
			return (
				"/?" +
				Object.entries(searchParams)
					.filter((param) => param[1])
					.map((param) => `${param[0]}=${param[1]}`)
					.join("&")
			);
		}

		return "/";
	});

	return currentUrl;
};

export const formatCountryName = (countryName: Country["name"]) => {
	if (!countryName.includes("(")) return countryName;

	const startIndex = countryName.indexOf("(");
	const endIndex = countryName.indexOf(")");
	const substr = countryName.slice(startIndex, endIndex + 1);
	countryName = countryName.replace(substr, "").trim();

	return countryName;
};
