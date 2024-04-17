import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	title: "Showtime",
	description: "Receive showtimes to your favorite movies!",
};

export default async function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/login");
	}

	return <main className="protected-main-layout">{children}</main>;
}
