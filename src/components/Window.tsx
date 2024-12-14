import React, { useRef } from "react";
import { cn } from "~/utils";
import { useDraggable } from "../hooks/useDraggable";
import { useFocusable } from "../hooks/useFocusable";
import { useResizable } from "../hooks/useResizable";
import { OptionsMenu, TitleBar, WindowFolderToolbar } from "./WindowLayout";
import { useProcessManager } from "~/hooks/useProcessManager";

export const Window = ({
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
	const ref = useRef<HTMLDivElement>(null);
	const { position, startDragging, setPosition } = useDraggable(
		ref,
		initialPosition,
	);
	const {
		size,
		setSize,
		handleMaximize,
		previousPosition,
		previousSize,
		isMaximized,
		setIsMaximized,
		setIsMinimized,
		isMinimized,
	} = useResizable(
		ref,
		initialSize ?? {
			width: window.innerWidth * 0.8,
			height: window.innerHeight / 2,
		},
	);
	const { isFocused, zIndex, focus } = useFocusable(processId);
	const { isAppMaximized } = useProcessManager();

	const handleStartDragging = (e: React.MouseEvent | React.TouchEvent) => {
		let clientX: number;
		let clientY: number;

		if ("touches" in e && e.touches[0]) {
			clientX = e.touches[0].clientX;
			clientY = e.touches[0].clientY;
		} else if ("clientX" in e) {
			clientX = e.clientX;
			clientY = e.clientY;
		} else {
			return; // Exit if we can't get client coordinates
		}

		if (isMaximized) {
			// Calculate the ratio of where the user clicked on the maximized window
			const ratioX = clientX / window.innerWidth;
			const ratioY = clientY / window.innerHeight;

			// Calculate the new position based on the click ratio and previous size
			const newX = clientX - previousSize.width * ratioX;
			const newY = clientY - 28 / 2; // Assuming 28px is the height of the title bar

			// Set the new position and size
			setPosition({ x: newX, y: newY });
			setSize(previousSize);
			setIsMaximized(false);

			// Start dragging from the new position
			startDragging(clientX, clientY, newX, newY);
		} else {
			// If not maximized, just start dragging from current position
			startDragging(clientX, clientY, position.x, position.y);
		}
	};

	return (
		<div
			id={processId}
			ref={ref}
			className={cn(
				"absolute h-full w-full select-none rounded-tl-[8px] rounded-tr-[8px] p-[3px]",
				isFocused ? "bg-hard-blue" : "bg-win-xp-blue-unfocused",
				!isAppMaximized(processId) && "hidden",
			)}
			style={{
				width: isMaximized ? window.innerWidth : size.width,
				height: isMaximized ? window.innerHeight : size.height - 28,
				left: isMaximized ? 0 : position.x,
				top: isMaximized ? 0 : position.y,
				zIndex: zIndex,
				touchAction: "none",
			}}
			onMouseDown={focus}
			onTouchStart={focus}
		>
			<div
				onMouseDown={handleStartDragging}
				onTouchStart={handleStartDragging}
				className="absolute left-0 top-0 w-full"
			>
				<TitleBar
					isFocused={isFocused}
					processId={processId}
					handleMaxmizeOrNot={() => {
						if (!isMaximized) {
							handleMaximize(position);
						} else {
							setPosition({
								x: previousPosition.x,
								y: previousPosition.y,
							});
							setSize(previousSize);
							setIsMaximized(false);
						}
					}}
					isMaximized={isAppMaximized(processId)}
				>
					{title}
				</TitleBar>
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
