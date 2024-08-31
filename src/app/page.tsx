import { MyDocuments } from "~/program-windows/MyDocuments";
import { ContactMe, InternetExplorer } from "~/program-windows/Others";

export default function HomePage() {
	return (
		<main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
			<div className="flex w-full flex-1 bg-[url('/img/bg.jpg')] bg-cover bg-center bg-no-repeat" />

			<div className="h-10 w-full bg-[url('/img/ui/taskbar.png')]" />

			<div className="absolute left-0 top-0 h-full w-full">
				<MyDocuments />
				<ContactMe />
				<InternetExplorer />
				<InternetExplorer />
				<InternetExplorer />
				<InternetExplorer />
			</div>
		</main>
	);
}
