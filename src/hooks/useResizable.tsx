import { useEffect, useState, type RefObject } from "react";

export const useResizable = (
	ref: RefObject<HTMLElement>,
	initialSize: { width: number; height: number },
) => {
	const [size, setSize] = useState(initialSize);

	// Implement resizing logic here

	return { size, setSize };
};
