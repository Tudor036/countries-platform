import countries from "../assets/data.json";

export type Country = (typeof countries)[0];
export type THomeSearchParams = {
	search?: string;
	region?: string;
};
