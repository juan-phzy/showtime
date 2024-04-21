import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
	title: "Showtime",
	description: "Receive showtimes to your favorite movies!",
};

export default async function ProtectedLayout({children}: Readonly<{children: React.ReactNode}>) {

	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/login");
	}

	return <main className="protected-main-container">{children}</main>;
}
