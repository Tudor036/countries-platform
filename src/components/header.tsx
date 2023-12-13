import { Show } from "solid-js";

import MoonIcon from "../assets/icons/moon";
import SunIcon from "../assets/icons/sun";
import createColorTheme from "../store/useTheme";

export default function Header() {
	const [theme, toggleTheme] = createColorTheme();

	return (
		<header class="w-full px-8 md:px-10 lg:px-20 py-7 flex flex-row justify-between bg-primaryLight dark:bg-primaryDark shadow-sm">
			<h1 class="sm:text-[14px] md:text-[19px] lg:text-[24px] font-extrabold text-[#111517] dark:text-white">
				Where in the World?
			</h1>
			<button
				type="button"
				class="flex flex-row items-center gap-2 md:gap-4 text-[14px] md:text-[18px] dark:text-white"
				onClick={toggleTheme}
			>
				<Show
					when={theme() === "light"}
					fallback={
						<>
							<SunIcon />
							<span class="font-body">Light Mode</span>
						</>
					}
				>
					<MoonIcon />
					<span class="font-body">Dark Mode</span>
				</Show>
			</button>
		</header>
	);
}
