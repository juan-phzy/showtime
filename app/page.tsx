import Image from "next/image";
import Link from "next/link";

export default function Index() {

	return (
		<section className="welcome-page-container">
			
			<div className="welcome-page-content">
				<div className="welcome-header-container">
					<Image className="object-contain" src="/images/Showtime_Full_Logo.png" alt="Showtime" fill />
				</div>
				<div className="welcome-page-body">
					<div className="welcome-image-container">
						<Image className="object-cover" src="/images/welcome-image.jpg" alt="Showtime" fill />
					</div>
					<div className="welcome-text">Enjoy Your Favorite Movies</div>
				</div>
				
				<div className="welcome-btns-container">
					<div className="welcome-btn">
						<Link className="rounded-btn" href="/sign-in">Sign In</Link>
					</div>
					<div className="welcome-btn">
						<Link className="rounded-btn" href="/sign-up">Sign Up</Link>
					</div>
				</div>
			</div>
			
			
		</section>
	);
}
