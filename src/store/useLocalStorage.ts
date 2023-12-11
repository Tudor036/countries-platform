import { createRenderEffect, createSignal } from "solid-js";

const localStorageStore = {
	get(key: string) {
		const item = window.localStorage.getItem(key);
		return item;
	},
	set(key: string, value: any) {
		window.localStorage.setItem(key, value);
	},
};

export default function useLocalStorage<T>(key: string, initialValue?: T) {
	const [value, setValue] = createSignal<T>();

	createRenderEffect(() => {
		if (typeof window === "undefined")
			return new Error("Window is undefined");

		const storedJSONValue = localStorageStore.get(key);
		const storedObjectValue = (JSON.parse(storedJSONValue) ?? {}) as Record<
			string,
			T
		>;
		const storedValue = storedObjectValue?.[key];

		if (value() === undefined) {
			const newValue = storedValue || initialValue;
			setValue(() => newValue);
			localStorageStore.set(
				key,
				JSON.stringify({ [`${key}`]: newValue })
			);
		} else if (value() !== storedValue) {
			localStorageStore.set(key, JSON.stringify({ [`${key}`]: value() }));
		}
	});

	return [value, setValue] as const;
}
