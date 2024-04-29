import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const {data: { user }} = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return user ? (
    <div className="w-full h-fit flex justify-between items-center gap-4">
      Email Logged In: {user.email}
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md border-solid border-white border-2">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/sign-in"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
