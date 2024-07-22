"use client";
import React from "react";
import Image from "next/image";

export const TitleBar = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="txt-shadow items-ceter flex h-[28px] items-center justify-between rounded-tl-[8px] rounded-tr-[7px] border border-b-0 border-l-[#0831d9] border-r-[#001ea0] border-t-[#0831d9] bg-win-xp-blue py-[3px] pl-[3px] pr-[5px] text-[12px] text-white">
			<span>{children}</span>
			<div className="flex gap-[1px]">
				<button className="bg-win-control-blue h-[20px] w-[20px] cursor-default rounded-[3px] border border-white shadow-[0_-1px_2px_inset_rgb(70,70,255)] hover:brightness-125"></button>
				<button className="bg-win-control-blue h-[20px] w-[20px] cursor-default rounded-[3px] border border-white shadow-[0_-1px_2px_inset_rgb(70,70,255)] hover:brightness-125"></button>
				<button className="bg-win-control-red h-[20px] w-[20px] cursor-default rounded-[3px] border border-white shadow-[0_-1px_2px_inset_rgb(218,70,0)] hover:brightness-125"></button>
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
