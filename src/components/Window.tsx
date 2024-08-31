import React, { useMemo, useRef } from "react";
import { useDraggable } from "../hooks/useDraggable";
import { useResizable } from "../hooks/useResizable";
import { useFocusable } from "../hooks/useFocusable";
import { TitleBar, OptionsMenu, WindowFolderToolbar } from "./WindowLayout";
import { cn } from "~/utils";

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
	const windowId = useMemo(
		() => `${processId}-${Math.random().toString(36).slice(2)}`,
		[processId],
	);

	const ref = useRef<HTMLDivElement>(null);
	const { position, startDragging } = useDraggable(ref, initialPosition);
	const { size } = useResizable(
		ref,
		initialSize ?? { width: 700, height: 500 },
	);
	const { isFocused, zIndex, focus } = useFocusable(windowId);

	return (
		<div
			id={windowId}
			ref={ref}
			className={cn(
				"absolute h-full w-full select-none rounded-tl-[8px] rounded-tr-[8px] p-[3px]",
				isFocused ? "bg-hard-blue" : "bg-win-xp-blue-unfocused",
			)}
			style={{
				width: size.width,
				height: size.height,
				left: position.x,
				top: position.y,
				zIndex: zIndex,
			}}
			onMouseDown={focus}
		>
			<div
				onMouseDown={startDragging}
				className="absolute left-0 top-0 w-full"
			>
				<TitleBar isFocused={isFocused}>{title}</TitleBar>
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
