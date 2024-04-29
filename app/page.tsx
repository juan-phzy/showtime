import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return redirect("/protected");
  }

  return (
    <section className="welcome-page-container">
      <div className="absolute left-0 top-0 right-0 bottom-0 bg-black/80"></div>
      <div className="welcome-page-content">
        <div className="welcome-header-container">
          <Image
            className="object-contain"
            src="/images/Showtime_Full_Logo.png"
            alt="Showtime"
            fill
          />
        </div>
        <div className="welcome-page-body">
          {/* <div className="welcome-image-container">
            <Image
              className="object-cover"
              src="/images/welcome-image.jpg"
              alt="Showtime"
              fill
            />
          </div> */}
          <div className="welcome-text">Enjoy Your Favorite Movies</div>
        </div>

        <div className="welcome-btns-container">
          <div className="welcome-btn">
            <Link className="rounded-btn" href="/sign-in">
              Sign In
            </Link>
          </div>
          <div className="welcome-btn">
            <Link className="rounded-btn bg-black border-solid border-[1px] border-red-400 text-red-400" href="/sign-up">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
