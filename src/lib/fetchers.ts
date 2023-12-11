import countries from "../assets/data.json";

const filterByRegion = (region: string, arr: typeof countries) =>
	arr.filter(
		(country) => country.region.toLowerCase() === region.toLowerCase()
	);

const filterBySearch = (search: string, arr: typeof countries) =>
	arr.filter((country) => country.name.includes(search));

export const countriesFercher = ([search, region]: (string | undefined)[]) => {
	const inRegion = region ? filterByRegion(region, countries) : countries;
	const inSearch = search ? filterBySearch(search, inRegion) : inRegion;

	return inSearch;
};

export const countryFetcher = ([name]: string[]) => {
	const country = countries.filter((country) => country.name === name);
	return country[0] || null;
};
