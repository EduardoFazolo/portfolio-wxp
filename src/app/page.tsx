"use client";
import Image from "next/image";
import { useState } from "react";
import { Desktop } from "~/components/Desktop";
import { Taskbar } from "~/components/Taskbar";
import { Window } from "~/components/Window";
import { useDoubleClick } from "~/hooks/useDoubleClick";
import { useProcessManager } from "~/hooks/useProcessManager";

interface App {
	name: string;
	icon: string;
	processSlug: string;
}

export default function HomePage() {
	const [apps, setApps] = useState<App[]>([
		{
			name: "My Documents",
			icon: "/img/ui/folder-xp.png",
			processSlug: "my-documents",
		},
	]);
	const { openApp, apps: openApps } = useProcessManager();

	const { handleClick, handleTouch } = useDoubleClick({
		onSingleClick: (id) => {
			document.getElementById(id)?.focus();
		},
		onDoubleClick: (id) => {
			const app = apps.find((a) => a.processSlug === id);
			if (app) {
				openApp(app);
				document.getElementById(id)?.blur();
			}
		},
	});

	return (
		<main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
			<Desktop>
				{apps.map((app, index) => (
					<div
						key={app.processSlug + index}
						className="group flex cursor-default select-none flex-col items-center"
						onClick={() => handleClick(app.processSlug)}
						onTouchStart={(e) => {
							e.preventDefault();
							handleTouch(app.processSlug, true);
						}}
						tabIndex={0}
					>
						<div className="relative h-[40px] w-[40px] group-focus:drop-shadow-[blue_0px_0px]">
							<Image
								src={app.icon}
								width={40}
								height={40}
								alt={"docs"}
								onSelect={(e) => e.preventDefault()}
								className="pointer-events-none select-none group-focus:opacity-80"
							/>
						</div>
						<p className="px-2 py-[1px] text-[12px] text-white [text-shadow:_1px_1px_1px_rgb(0_0_0_/_90%)] group-focus:bg-[#0b61ff] group-focus:[text-shadow:_0px_0px_0px_rgb(0_0_0_/_90%)]">
							{app.name}
						</p>
					</div>
				))}
			</Desktop>

			{openApps.map((app) => (
				<Window
					key={"w-" + app.processId}
					processId={app.processId}
					title={app.name + " - " + app.processId}
					initialPosition={{ x: 20, y: 120 }}
				>
					<div className="flex h-full w-full">My Documents</div>
				</Window>
			))}
			<Taskbar />
		</main>
	);
}
