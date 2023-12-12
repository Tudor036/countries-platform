import { createSignal } from "solid-js";

type IntersectionObserverOptions = {
	root: HTMLElement;
	rootMargin?: string;
	threshold?: number;
};

export default function createIntersectionObserver(
	opts: IntersectionObserverOptions,
	callback: Function
) {
	const [intersecting, setIntersecting] = createSignal(false);

	return [];
}
