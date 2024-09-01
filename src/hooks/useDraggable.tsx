import { useState, useEffect, RefObject } from "react";

interface Position {
	x: number;
	y: number;
}

export const useDraggable = (
	ref: RefObject<HTMLElement>,
	initialPosition?: Position,
) => {
	const [position, setPosition] = useState<Position>(
		initialPosition ?? { x: 0, y: 0 },
	);

	const startDragging = (
		clientX: number,
		clientY: number,
		initialX?: number,
		initialY?: number,
	) => {
		const startX = clientX - (initialX ?? position.x);
		const startY = clientY - (initialY ?? position.y);

		const handleMove = (moveClientX: number, moveClientY: number) => {
			setPosition({
				x: moveClientX - startX,
				y: moveClientY - startY,
			});
		};

		const handleEnd = () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("touchmove", handleTouchMove);
			document.removeEventListener("mouseup", handleEnd);
			document.removeEventListener("touchend", handleEnd);
		};

		const handleMouseMove = (e: MouseEvent) =>
			handleMove(e.clientX, e.clientY);
		const handleTouchMove = (e: TouchEvent) => {
			if (e.touches.length > 0 && e.touches[0]) {
				e.preventDefault();
				handleMove(e.touches[0].clientX, e.touches[0].clientY);
			}
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("touchmove", handleTouchMove, {
			passive: false,
		});
		document.addEventListener("mouseup", handleEnd);
		document.addEventListener("touchend", handleEnd);
	};

	return { position, setPosition, startDragging };
};
