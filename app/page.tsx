import Link from "next/link";

export default function Index() {

	return (
		<section className="welcome-page-container">
			
			<div className="welcome-page-content">
				<div className="welcome-header-container">Header</div>
				<div className="welcome-image-container">Image</div>
				<div className="welcome-btns-container">
					<div className="welcome-btn">
						<Link href="/sign-in">Sign In</Link>
					</div>
					<div className="welcome-btn">
						<Link href="/sign-up">Sign Up</Link>
					</div>
				</div>
			</div>
			
			
		</section>
	);
}
