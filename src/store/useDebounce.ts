import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";

export default function useDebounce<T>(signal: Accessor<T>, delay = 500) {
	const [value, setValue] = createSignal<T>(signal());

	createEffect(() => {
		const updateTimeout = setTimeout(() => setValue(() => signal()), delay);

		onCleanup(() => clearTimeout(updateTimeout));
	});

	return [value];
}
