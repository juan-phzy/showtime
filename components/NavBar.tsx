"use client";

import { NAVLINKS } from "@/utils/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  const pathname = usePathname();
  const isCompletingSignUp = pathname.includes("/protected/complete-sign-up");

  console.log("pathname: ", pathname);
  console.log("isCompletingSignUp: ", isCompletingSignUp);

  return (
    <div className={`navbar-container ${isCompletingSignUp && 'hidden'}`}>
      <div className="navbar-logo">
        <Image
          className="object-contain"
          src="/images/Showtime_Full_Logo.png"
          alt="Showtime Logo"
          fill
        />
      </div>
      <div className="mobile-links-container">
        {NAVLINKS.map((link) => (
          <Link
            key={link.label}
            className={`navbar-mobile-link ${
              pathname === link.href && "text-red-400"
            }`}
            href={link.href}
          >
            {link.icon ? <link.icon className="w-[25px] h-[25px]" /> : null}
            <div className="text-xs">{link.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
