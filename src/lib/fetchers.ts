import countries from "../assets/data.json";
import { formatCountryName } from "./utils";

const filterByRegion = (region: string, arr: typeof countries) =>
	arr.filter(
		(country) => country.region.toLowerCase() === region.toLowerCase()
	);

const filterBySearch = (search: string, arr: typeof countries) =>
	arr.filter((country) => country.name.toLowerCase().includes(search));

export const countriesFercher = async ([search, region]: [
	string | undefined,
	string | undefined
]) => {
	const inRegion = region ? filterByRegion(region, countries) : countries;
	const inSearch = search ? filterBySearch(search, inRegion) : inRegion;

	return inSearch.map((country) => {
		country.name = formatCountryName(country.name);
		return country;
	});
};

export const countryFetcher = ([name]: string[]) => {
	const country = countries.filter(
		(country) => country.name.toLowerCase() === name.toLowerCase()
	)?.[0];

	if (!country?.borders) return country;

	const borderCountries = country.borders.map((shorthand) => {
		const borderCountry = countries.find(
			(_country) => _country.alpha3Code === shorthand
		);
		return formatCountryName(borderCountry.name);
	});

	return { ...country, borders: borderCountries || [] };
};
