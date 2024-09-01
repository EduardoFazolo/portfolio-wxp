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
	} = useResizable(ref, initialSize ?? { width: 700, height: 500 });
	const { isFocused, zIndex, focus } = useFocusable(processId);

	return (
		<div
			id={processId}
			ref={ref}
			className={cn(
				"absolute h-full w-full select-none rounded-tl-[8px] rounded-tr-[8px] p-[3px]",
				isFocused ? "bg-hard-blue" : "bg-win-xp-blue-unfocused",
			)}
			style={{
				width: isMaximized ? window.innerWidth : size.width,
				height: isMaximized ? window.innerHeight : size.height - 28,
				left: isMaximized ? 0 : position.x,
				top: isMaximized ? 0 : position.y,
				zIndex: zIndex,
			}}
			onMouseDown={focus}
		>
			<div
				onMouseDown={(e) => {
					setIsMaximized(false);
					startDragging(e);
				}}
				className="absolute left-0 top-0 w-full"
			>
				<TitleBar
					isFocused={isFocused}
					windowId={processId}
					handleMaxmizeOrNot={() => {
						if (!isMaximized) {
							handleMaximize(position);
						} else {
							setPosition({
								x: previousPosition.x,
								y: window.innerHeight - 200,
							});
							setSize(previousSize);
							setIsMaximized(false);
						}
					}}
					onMinimize={() => {
						// TODO: needs to implement logic
						setIsMinimized(true);
					}}
					isMaximized={isMaximized}
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
