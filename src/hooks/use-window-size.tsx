import {
	useState, useEffect,
} from "react";

type Breakpoint = "small" | "large";

export type Size = {
  width: number | undefined;
  height: number | undefined;
  breakpoint: Breakpoint | undefined;
};

const breakpoints = {
	small: 480,
} as const;

export default function useWindowSize(): Size{
	const [
		windowSize,
		setWindowSize,
	] = useState<Size>({
		width: undefined,
		height: undefined,
		breakpoint: undefined,
	});

	useEffect(
		() => {
			function handleResize(){
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
					breakpoint: window.innerWidth > breakpoints.small
						? "large"
						: "small",
				});
			}
			window.addEventListener(
				"resize",
				handleResize,
			);
			handleResize();
			return () => window.removeEventListener(
				"resize",
				handleResize,
			);
		},
		[],
	);

	return windowSize;
}
