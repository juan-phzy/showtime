import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
	const canInitSupabaseClient = () => {
		try {
			createClient();
			return true;
		} catch (e) {
			return false;
		}
	};

	const isSupabaseConnected = canInitSupabaseClient();

	return (
		<section>
			<div>
				<AuthButton />
			</div>
			<div>This is the main page</div>
		</section>
	);
}
