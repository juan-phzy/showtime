import AuthButton from "@/components/AuthButton";

export default async function ProtectedPage() {
	return (
		<section>
			<div>
				<AuthButton />
			</div>
			<div>This is the protected Page</div>
		</section>
	);
}
