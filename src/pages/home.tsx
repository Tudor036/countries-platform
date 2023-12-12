import Searchbar from "../components/searchbar";
import Dropdown from "../components/dropdown";
import Cardlist from "../components/cardlist";

export default function Home() {
	return (
		<>
			<section class="flex flex-col md:flex-row gap-10 md:justify-between w-full mb-10 md:mb-16">
				<Searchbar />
				<Dropdown />
			</section>
			<section>
				<Cardlist />
			</section>
		</>
	);
}
