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

export default function createLocalStorage<T>(key: string, initialValue?: T) {
	const [value, _setValue] = createSignal<T>();

	const storeValue = (val: () => T) =>
		localStorageStore.set(key, JSON.stringify({ [`${key}`]: val() }));

	const initializeValue = () => {
		if (typeof window === "undefined")
			return new Error("Window is undefined");

		const storedJSONValue = localStorageStore.get(key);
		const storedObjectValue = (JSON.parse(storedJSONValue) ?? {}) as Record<
			string,
			T
		>;
		const storedValue = storedObjectValue?.[key];
		const newValue = storedValue || initialValue;
		_setValue(() => newValue);
		localStorageStore.set(key, JSON.stringify({ [`${key}`]: newValue }));
	};

	initializeValue();

	return [
		value,
		(val: () => T) => {
			storeValue(val);
			_setValue(val);
		},
	] as const;
}
