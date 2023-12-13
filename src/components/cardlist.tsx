import { Accessor, Component, For, Show, createResource } from "solid-js";
import { Country, THomeSearchParams } from "../lib/types";
import { A, useSearchParams } from "@solidjs/router";
import { countriesFercher } from "../lib/fetchers";
import NotFound from "./404";
import { getHomeUrl } from "../lib/utils";

type CardItemProps = {
	origin: Accessor<string>;
	country: Country;
};

const CardItem: Component<CardItemProps> = (props) => {
	return (
		<li class="flex">
			<A
				href={`/${encodeURI(props.country.name)}`}
				state={{
					origin: props.origin(),
				}}
				class="max-w-[270px] w-full m-auto shadow-md bg-primaryLight dark:bg-primaryDark rounded-sm overflow-hidden"
			>
				<div class="w-full h-[160px]">
					<img
						src={props.country.flags.svg}
						class="w-full h-full object-cover"
					/>
				</div>
				<div class="p-6 dark:text-white">
					<h2 class="font-heading text-lg whitespace-nowrap overflow-hidden text-ellipsis ">
						{props.country.name}
					</h2>
					<p>
						<span class="font-body">Population</span>:{" "}
						{Intl.NumberFormat("en-US").format(
							props.country.population
						)}
					</p>
					<p>
						<span class="font-body">Region</span>:{" "}
						{props.country.region}
					</p>
					<p class="text-ellipsis overflow-hidden whitespace-nowrap">
						<span class="font-body">Capital</span>:{" "}
						{props.country.capital}
					</p>
				</div>
			</A>
		</li>
	);
};

const Cardlist: Component = () => {
	const [searchParams] = useSearchParams<THomeSearchParams>();

	const [countries] = createResource(
		() => [
			searchParams.search?.toLowerCase(),
			searchParams.region?.toLowerCase(),
		],
		countriesFercher
	);

	const currentUrl = getHomeUrl();

	return (
		<Show when={!countries.loading} fallback={<h2>Loading...</h2>}>
			<Show when={countries.latest.length > 0} fallback={<NotFound />}>
				<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-16">
					<For each={countries.latest}>
						{(country) => (
							<CardItem origin={currentUrl} country={country} />
						)}
					</For>
				</ul>
			</Show>
		</Show>
	);
};

export default Cardlist;
