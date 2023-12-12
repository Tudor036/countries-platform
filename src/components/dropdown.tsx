import { useSearchParams } from "@solidjs/router";
import { THomeSearchParams } from "../lib/types";
import { Component } from "solid-js";
import AngleDown from "../assets/icons/angleDown";

const Dropdown: Component = () => {
	const [searchParams, setSearchParams] =
		useSearchParams<THomeSearchParams>();

	return (
		<label
			for="region"
			class="text-primaryLight dark:text-white bg-white dark:bg-primaryDark w-fit flex flex-row items-center relative cursor-pointer shadow-sm dark:shadow-none"
		>
			<select
				name="region"
				id="region"
				class="px-6 pr-10 py-4 md:py-5 w-fit h-full text-primaryLight dark:text-white bg-white dark:bg-primaryDark focus:outline-none appearance-none cursor-pointer font-body"
				value={searchParams.region || ""}
				onInput={(e) =>
					setSearchParams({
						region: e.target.value?.toLowerCase(),
					})
				}
			>
				<option selected value="">
					World Wide
				</option>
				<option value="africa">Africa</option>
				<option value="americas">America</option>
				<option value="asia">Asia</option>
				<option value="europe">Europe</option>
				<option value="oceania">Oceania</option>
			</select>
			<AngleDown class="absolute right-4" />
		</label>
	);
};

export default Dropdown;
