"use client";
import Image from "next/image";
import React from "react";
import { useProcessManager } from "~/hooks/useProcessManager";
import { cn } from "~/utils";

export const TitleBar = ({
	isFocused,
	processId,
	handleMaxmizeOrNot,
	isMaximized,
	children,
}: {
	isFocused: boolean;
	processId: string;
	handleMaxmizeOrNot: () => void;
	isMaximized: boolean;
	children: React.ReactNode;
}) => {
	const { closeApp, focusApp, minimizeApp } = useProcessManager();

	return (
		<div
			className={cn(
				"txt-shadow items-ceter flex h-[28px] items-center justify-between rounded-tl-[8px] rounded-tr-[7px] py-[3px] pl-[3px] pr-[5px] text-[12px] text-white",
				isFocused ? "bg-win-xp-blue" : "bg-win-xp-blue-unfocused",
			)}
			onMouseDown={() => {
				focusApp(processId);
			}}
		>
			<span className="line-clamp-1">{children}</span>
			<div className="flex gap-[1px]">
				<button
					className={cn(
						"win-xp-minimize-button",
						!isFocused && "opacity-80",
					)}
					onMouseUp={() => {
						minimizeApp(processId);
					}}
				/>
				<button
					className={cn(
						!isFocused && "opacity-80",
						isMaximized
							? "win-xp-minmax-button"
							: "win-xp-maximize-button",
					)}
					onMouseDown={() => {
						focusApp(processId);
						handleMaxmizeOrNot();
					}}
				/>
				<button
					className={cn(
						"win-xp-close-button",
						!isFocused && "opacity-80",
					)}
					onClick={() => {
						focusApp(processId);
						closeApp(processId);
					}}
				/>
			</div>
		</div>
	);
};

const BackAndFourthButtons = () => {
	const [histBack, setHistBack] = React.useState([]);
	const [histForth, setHistForth] = React.useState([]);
	return (
		<div className="flex h-[36px] items-center justify-between">
			{/* Back */}
			<button disabled={histBack.length === 0} className="btn-explorer">
				<Image
					src="/img/ui/arrow-left-xp.png"
					alt="back"
					width={30}
					height={30}
					className="pointer-events-none"
				/>
				Back
				<div className="arrow-down-xp mx-1" />
			</button>

			{/* Fourth */}
			<button className="btn-explorer" disabled={histForth.length === 0}>
				<Image
					src="/img/ui/arrow-right-xp.png"
					alt="fourth"
					width={30}
					height={30}
					className="pointer-events-none"
				/>
				<div className="arrow-down-xp mx-1" />
			</button>
		</div>
	);
};

export const WindowFolderToolbar = () => {
	return (
		<div className="flex h-[36px] items-center px-1">
			<BackAndFourthButtons />

			<button className="btn-explorer group">
				<Image
					src="/img/ui/previous-folder-xp.png"
					alt="folder"
					width={22}
					height={22}
					className="btn-explorer-icon ml-[1px] mr-[4px]"
					draggable={false}
				/>
			</button>

			<div className="separator-y" />

			<button className="btn-explorer group">
				<Image
					src="/img/ui/search-xp.png"
					alt="folder"
					width={22}
					height={22}
					className="btn-explorer-icon ml-[1px] mr-[4px]"
				/>
				<span>Search</span>
			</button>

			<button className="btn-explorer group">
				<Image
					src="/img/ui/folders-xp.png"
					alt="folder"
					width={22}
					height={22}
					className="btn-explorer-icon ml-[1px] mr-[4px]"
				/>
				<span>Folders</span>
			</button>

			<div className="separator-y" />

			<button className="btn-explorer group">
				<Image
					src="/img/ui/folder-functions-xp.png"
					alt="folder"
					width={22}
					height={22}
					className="btn-explorer-icon ml-[2px] mr-[1px]"
				/>
				<div className="arrow-down-xp mx-1" />
			</button>
		</div>
	);
};

export const OptionsMenu = ({ options }: { options: string[] }) => {
	return (
		<div className="flex justify-between border-b border-b-white border-opacity-70">
			<div className="flex w-full border-b border-r border-b-black border-r-black border-opacity-10 py-[1px] pl-[2px]">
				<ul className="flex items-center">
					{options.map((option, index) => (
						<li
							key={index}
							className="m-0 h-max px-[7px] text-[11px] hover:bg-[#1660e8] hover:text-white"
						>
							{option}
						</li>
					))}
				</ul>
			</div>
			<div className="relative flex h-[22px] w-[40px] items-center border-b border-r border-b-black border-r-black border-opacity-10">
				<Image
					src="/img/ui/win-logo-corner.png"
					alt="arrow"
					fill
					style={{ objectFit: "contain" }}
				/>
			</div>
		</div>
	);
};
