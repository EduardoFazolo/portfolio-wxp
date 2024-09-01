import { useCallback, useEffect, useState, type RefObject } from "react";

export const useResizable = (
	ref: RefObject<HTMLElement>,
	initialSize: { width: number; height: number },
) => {
	const [size, setSize] = useState(initialSize);
	const [previousSize, setPreviousSize] = useState({ width: 0, height: 0 });
	const [previousPosition, setPreviousPosition] = useState({ x: 0, y: 0 });
	const [isMaximized, setIsMaximized] = useState(false);
	const [isWindowless, setIsWindowless] = useState(false);
	const [isMinimized, setIsMinimized] = useState(false);

	const handleMaximize = useCallback(
		({ x, y }: { x: number; y: number }) => {
			if (!isMaximized) {
				setIsMaximized(true);
				setPreviousPosition({ x, y });
				setPreviousSize({ width: size.width, height: size.height });
			}
		},
		[isMaximized],
	);

	// Implement resizing logic here

	return {
		size,
		setSize,
		isMaximized,
		setIsMaximized,
		handleMaximize,
		previousSize,
		previousPosition,
		isWindowless,
		setIsWindowless,
		isMinimized,
		setIsMinimized,
	};
};
