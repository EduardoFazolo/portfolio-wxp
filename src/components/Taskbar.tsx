"use client";

import Image from "next/image";
import { useProcessManager } from "~/hooks/useProcessManager";
import { cn } from "~/utils";

export const Taskbar = () => {
	const { apps, focusApp, focusedProcessId } = useProcessManager();

	return (
		<div className="z-[999999999] h-8 w-full bg-win-taskbar">
			<div className="flex h-full w-full items-center">
				<Image
					src="/img/ui/start-menu.png"
					alt="start-menu"
					width={94}
					height={30}
					className="mr-3 select-none hover:brightness-125"
				/>
				{apps
					.sort((a, b) => a.order - b.order)
					.map((app) => {
						return (
							<div
								key={app.processId}
								className={cn(
									"flex h-6 w-full max-w-[150px] cursor-default select-none items-center rounded-sm bg-[#3c81f3] px-2 py-[1px] text-[12px] text-white shadow-[rgba(0,0,0,0.3)_-1px_0px_inset,rgba(255,255,255,0.2)_1px_1px_1px_inset]",
									focusedProcessId === app.processId &&
										"bg-[#1e52b7] shadow-[rgba(0,0,0,0.3)_-1px_0px_inset,rgba(255,255,255,0.2)_1px_1px_1px_inset]",
								)}
								onClick={() => {
									focusApp(app.processId);
								}}
							>
								{app.name}
							</div>
						);
					})}
			</div>
		</div>
	);
};
