import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { SignUpSearchParams, FormSubmitFunction } from "@/utils/constants";
import SignUpStep1 from "@/components/forms/SignUpStep1";
import SignUpStep2 from "@/components/forms/SignUpStep2";

import { getHeaderText } from "@/utils/utilityFuncs";
import SignUpStep3 from "@/components/forms/SignUpStep3";

export default async function CompleteSignUpPage ({searchParams}: Readonly<{searchParams: SignUpSearchParams}>) {

  //--------------------------------------------------------------------------------Check if user is logged in
  const supabase = createClient();
	const {data: { user }} = await supabase.auth.getUser();
	if (!user) {
		return redirect("/");
	}

  const submitUserInfo: FormSubmitFunction = async (formData: FormData) => {
    "use server";

    const username = formData.get("username") as string;
    const phone = formData.get("phone") as string;
    const showtime = formData.get("showtime") as string;

    const supabase = createClient();
    const {data: { user }} = await supabase.auth.getUser();
    const userId = user?.id;
    console.log("\n\nUser ID: ",userId,"\n\n");
    
    const { data, error } = await supabase
      .from('generalUsers')
      .upsert([
        { auth_id:userId, user_name: username, phone_number: phone, showtime_preference: showtime },
      ])
      .select();
    
    if (error) {
      return redirect(`/protected/complete-sign-up?step=1&error=true&message=${error.message}`);
    }

    console.log("\n\nUser data inserted successfully\n\n");
    console.log("Data:\n\n",data,"\n\n");
    return redirect("/protected/complete-sign-up?step=2");
  };

  const headerText = getHeaderText(searchParams.step); 

  return (
    <section className="complete-signup-container">
      <div className="complete-signup-content">
        <div className="complete-signup-header">{headerText}</div>
        <div className="complete-signup-form-container">
          {searchParams.step === "1" && (<SignUpStep1 formSubmit={submitUserInfo} searchParams={searchParams} />)}
          {searchParams.step === "2" && (<SignUpStep2 uid={user.id} searchParams={searchParams} />)}
          {searchParams.step === "3" && (<SignUpStep3 />)}
        </div>
      </div>
    </section>
  )
}

