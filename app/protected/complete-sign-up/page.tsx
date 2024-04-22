import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/buttons/SubmitButton";

import { SearchParams, FormSubmitFunction } from "@/utils/constants";
import SignUpStep1 from "@/components/forms/SignUpStep1";

export default async function CompleteSignUpPage ({searchParams}: Readonly<{searchParams: SearchParams}>) {

  const supabase = createClient();

	const {data: { user }} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/");
	}

  const formSubmit: FormSubmitFunction = async (formData: FormData) => {
    "use server";

    const username = formData.get("username") as string;
    const phone = formData.get("phone") as string;
    const showtime = formData.get("showtime") as string;

    const supabase = createClient();
    const {data: { user }} = await supabase.auth.getUser();
    const userId = user?.id;
 
    const { data, error } = await supabase
      .from('generalUsers')
      .insert([
        { auth_id:userId, user_name: username, phone_number: phone, showtime_preference: showtime },
      ])
      .select();
    if (error) {
      return redirect(`/protected/complete-sign-up?message=Error:   ${error.message}`);
    }

    console.log(data)
    return redirect("/protected/complete-sign-up?message=SupaBase Success&joe=1234");
  };

  return (
    <section className="complete-signup-container">
      <div className="complete-signup-content">
        <div className="complete-signup-form-container">
          <SignUpStep1 formSubmit={formSubmit} searchParams={searchParams} /> 
        </div>
      </div>
    </section>
  )
}

