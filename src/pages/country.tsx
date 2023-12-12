import { A, useLocation, useParams } from "@solidjs/router";
import { For, Show, createResource } from "solid-js";
import { countryFetcher } from "../lib/fetchers";
import NotFound from "../components/404";
import ArrowLeft from "../assets/icons/arrowLeft";

export default function Country() {
	const params = useParams<{ country: string }>();
	const location = useLocation<{ origin?: string }>();
	const [country] = createResource(
		() => [decodeURI(params.country)],
		countryFetcher
	);

	return (
		<>
			<section class="mb-16 lg:mb-20">
				<A
					href={location.state?.origin ?? "/"}
					class="flex flex-row gap-4 items-center w-fit shadow-sm rounded-sm font-body dark:text-white py-3 px-10 bg-primaryLight dark:bg-primaryDark"
				>
					<ArrowLeft />
					<span>Back</span>
				</A>
			</section>
			<section class="dark:text-white flex flex-col md:flex-row justify-between w-full h-full">
				<Show when={!country.loading} fallback={<h2>Loading...</h2>}>
					<Show when={country.latest} fallback={<NotFound />}>
						<div class="flex-1 h-[300px] md:pr-16 lg:pr-20">
							<img
								src={country.latest.flags.svg}
								class="w-full h-full object-cover aspect-video"
							/>
						</div>
						<div class="flex-1 md:pl-16 lg:pl-20 space-y-6 h-full">
							<h2 class="font-heading text-3xl">
								{country.latest.name}
							</h2>
							<div class="flex flex-col md:flex-row justify-between mt-auto mb-auto">
								<div>
									<p style={{ "line-height": "32px" }}>
										<span class="font-body">
											Native Name
										</span>
										: {country.latest.nativeName}
									</p>
									<p style={{ "line-height": "32px" }}>
										<span class="font-body">
											Population
										</span>
										: {country.latest.population}
									</p>
									<p style={{ "line-height": "32px" }}>
										<span class="font-body">Region</span>:{" "}
										{country.latest.region}
									</p>
									<p style={{ "line-height": "32px" }}>
										<span class="font-body">Subregion</span>
										: {country.latest.subregion}
									</p>
									<Show when={country.latest.capital}>
										<p style={{ "line-height": "32px" }}>
											<span class="font-body">
												Capital
											</span>
											: {country.latest.capital}
										</p>
									</Show>
								</div>
								<div>
									<p style={{ "line-height": "32px" }}>
										<span class="font-body">
											Top Level Domains
										</span>
										: {country.latest.topLevelDomain}
									</p>
									<p style={{ "line-height": "32px" }}>
										<span class="font-body">
											Currencies
										</span>
										: {country.latest.currencies[0].name}
									</p>
									<p style={{ "line-height": "32px" }}>
										<span class="font-body">Languages</span>
										:{" "}
										{country.latest.languages
											.map((lang) => lang.name)
											.join(", ")}
									</p>
								</div>
							</div>
							<Show when={country.latest.borders}>
								<div class="space-y-3">
									<p>
										<span class="font-body text-xl">
											Border Countries
										</span>
										:
									</p>
									<div class="flex flex-row flex-wrap gap-3">
										<For each={country.latest.borders}>
											{(countryName) => (
												<span class="py-2 px-4 bg-primaryLight dark:bg-primaryDark">
													<A href={`/${countryName}`}>
														{countryName}
													</A>
												</span>
											)}
										</For>
									</div>
								</div>
							</Show>
						</div>
					</Show>
				</Show>
			</section>
		</>
	);
}
