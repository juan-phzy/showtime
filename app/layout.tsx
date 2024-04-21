import { GeistSans } from "geist/font/sans";
import "./globals.css";


export const metadata = {
	title: "Showtime",
	description: "Receive showtimes to your favorite movies!",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body>
				<main className="main-container">{children}</main>
			</body>
		</html>
	);
}
