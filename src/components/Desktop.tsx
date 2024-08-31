export const Desktop = ({ children }: { children?: React.ReactNode }) => {
	return (
		<div className="flex w-full flex-1 bg-[url('/img/bg.jpeg')] bg-cover bg-center bg-no-repeat">
			<div className="flex h-full w-full flex-wrap gap-5 p-10">
				{children}
			</div>
		</div>
	);
};
