"use client"

import { NAVLINKS } from "@/utils/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


const NavBar = () => {

	const pathname = usePathname();

  return (
		<>
			<div className="navbar-logo">
				<Image className="object-contain" src="/images/Showtime_Full_Logo.png" alt="Showtime Logo" fill />
			</div>
			<div className="mobile-links-container">
				{NAVLINKS.map((link) => (
						<Link key={link.label} className={`navbar-mobile-link ${pathname === link.href && 'text-[#F47A62]'}`} href={link.href}>
								{link.icon ? <link.icon className="w-[25px] h-[25px]" /> : null}
								<div className="text-xs">{link.label}</div>
						</Link> 
				))}
			</div>
		</>
  )
}

export default NavBar