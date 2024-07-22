"use client";
import React from "react";
import { TitleBar, OptionsMenu, WindowFolderToolbar } from "./WindowLayout";

export const DraggableWindow = ({
	children,
	processId,
	initialPosition,
	initialSize,
	title = "Title",
}: {
	children: React.ReactNode;
	processId: string;
	initialPosition?: { x: number; y: number };
	initialSize?: { width: number; height: number };
	title?: string;
}) => {
	const [isFocused, setIsFocused] = React.useState(false);
	const [isDragging, setIsDragging] = React.useState(false);
	const [[innerXRelative, innerYRelative], setInnerRelative] = React.useState(
		[0, 0],
	);
	const ref = React.useRef<HTMLDivElement>(null);
	const sizeThing = initialSize ?? { width: 700, height: 500 };
	const [size, setSize] = React.useState(sizeThing);

	React.useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			if (!ref.current) return;

			const windowMouseX = event.clientX;
			const windowMouseY = event.clientY;

			const xMove = windowMouseX - innerXRelative;
			const yMove = windowMouseY - innerYRelative;

			ref.current.style.left = `${xMove}px`;
			ref.current.style.top = `${yMove}px`;
		};

		if (isDragging) {
			if (ref.current) {
				window.addEventListener("mousemove", handleMouseMove);
			}
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [ref, isDragging, innerXRelative, innerYRelative]);

	React.useEffect(() => {
		const handleMouseUp = (event: MouseEvent) => {
			if (event.button !== 0) return;
			setIsDragging(false);
		};
		window.addEventListener("mouseup", handleMouseUp);
		return () => {
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [ref]);

	React.useEffect(() => {
		if (initialPosition && ref.current) {
			ref.current.style.left = `${initialPosition.x}px`;
			ref.current.style.top = `${initialPosition.y}px`;
			ref.current.style.zIndex = "100";
		}
	}, []);

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				ref.current.style.zIndex = "90";
				console.log("click outside of", processId);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [processId, isFocused]);

	return (
		<div
			className="absolute h-full w-full select-none rounded-tl-[8px] rounded-tr-[8px] bg-hard-blue p-[3px]"
			style={{ width: size.width, height: size.height }}
			ref={ref}
			onMouseDown={() => {
				setIsFocused(true);
				if (!ref.current) return;
				ref.current.style.zIndex = "100";
			}}
			onMouseUp={() => {
				setIsFocused(false);
			}}
		>
			<div
				onMouseDown={(event) => {
					setIsFocused(true);
					if (!ref.current) return;
					ref.current.style.zIndex = "100";

					event.stopPropagation();
					setIsDragging(true);
					const windowMouseX = event.clientX;
					const windowMouseY = event.clientY;

					const innerXRelative =
						windowMouseX - ref.current.offsetLeft;
					const innerYRelative = windowMouseY - ref.current.offsetTop;

					setInnerRelative([innerXRelative, innerYRelative]);
				}}
				onMouseUp={() => {
					setIsDragging(false);
					setIsFocused(false);
				}}
				className="absolute left-0 top-0 w-full"
			>
				<TitleBar>{title}</TitleBar>
			</div>
			<div className="mt-[25px] bg-win-xp-white">
				<OptionsMenu
					options={[
						"File",
						"Edit",
						"View",
						"Favorites",
						"Tools",
						"Help",
					]}
				/>
				<WindowFolderToolbar />
				<div className="mx-2 bg-white">{children}</div>
			</div>
		</div>
	);
};
