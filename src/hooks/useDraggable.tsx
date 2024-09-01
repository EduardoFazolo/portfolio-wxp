import { useState, useEffect, RefObject } from "react";

export const useDraggable = (
	ref: RefObject<HTMLElement>,
	initialPosition?: { x: number; y: number },
) => {
	const [isDragging, setIsDragging] = useState(false);
	const [position, setPosition] = useState(initialPosition ?? { x: 0, y: 0 });
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging) return;
			const dx = e.clientX - dragStart.x;
			const dy = e.clientY - dragStart.y;
			setPosition({ x: position.x + dx, y: position.y + dy });
			setDragStart({ x: e.clientX, y: e.clientY });
		};

		const handleMouseUp = () => setIsDragging(false);

		if (isDragging) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [isDragging, dragStart, position]);

	const startDragging = (e: React.MouseEvent) => {
		setIsDragging(true);
		setDragStart({ x: e.clientX, y: e.clientY });
	};

	return { position, setPosition, startDragging };
};
