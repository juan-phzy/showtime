import NavBar from "@/components/NavBar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";



export const metadata = {
	title: "Showtime",
	description: "Receive showtimes to your favorite movies!",
};

export default async function ProtectedLayout({children}: Readonly<{children: React.ReactNode}>) {

	const supabase = createClient();
	const {data: { user }} = await supabase.auth.getUser();
	if (!user) { return redirect("/");}

	let { data: generalUsers, error } = await supabase
  .from('generalUsers')
  .select("user_name");
	const username = generalUsers ? generalUsers[0].user_name : "User";
	if (error) { console.log(error) }


	return (
	<main className="protected-main-container">
		<div className="protected-content-container">
			{children}
		</div>
		<div className="navbar-container">
			<NavBar />
		</div>
	</main>
	);
}
