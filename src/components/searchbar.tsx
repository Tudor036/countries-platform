import { Component } from "solid-js";
import MagnifyingGlass from "../assets/icons/magnifyingGlass";
import { useSearchParams } from "@solidjs/router";
import { THomeSearchParams } from "../lib/types";

const Searchbar: Component = (props) => {
	const [searchParams, setSearchParams] =
		useSearchParams<THomeSearchParams>();

	const onSearchInputCallback = (
		e: InputEvent & {
			currentTarget: HTMLElement;
			target: HTMLInputElement;
		}
	) => {
		setSearchParams({
			search: e.target.value?.toLowerCase(),
		});
	};

	return (
		<div class="flex flex-row gap-6 items-center py-4 md:py-5 px-8 bg-primaryLight dark:bg-primaryDark rounded-sm max-w-lg w-full shadow-sm dark:shadow-none">
			<button class="w-4 h-4 md:w-5 md:h-5">
				<MagnifyingGlass />
			</button>
			<input
				autocomplete="off"
				type="search"
				name="searchbar"
				placeholder="Search for a country..."
				value={searchParams.search || ""}
				class="w-full font-semibold text-secondatyLight dark:text-white bg-transparent outline-none autofill:bg-transparent"
				style={{ "line-height": "20px" }}
				onInput={onSearchInputCallback}
			/>
		</div>
	);
};

export default Searchbar;
