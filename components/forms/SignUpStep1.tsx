"use client"

import { SubmitButton } from '../buttons/SubmitButton';

import { SignUpSearchParams, FormSubmitFunction } from "@/utils/constants";


interface SignUpFormProps {
    formSubmit: FormSubmitFunction;
    searchParams: SignUpSearchParams;
    userData: any;
  }

const SignUpStep1: React.FC<SignUpFormProps> = ({ formSubmit, searchParams, userData }) => {

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      // Prevent non-numeric characters from being inputted
      event.target.value = event.target.value.replace(/\D/g, '').slice(0, 10);
    };

  
  return (
    <form className="form-1">
      <label className="form-1-label" htmlFor="username">
        Username
      </label>
      <input
        value={userData?.user_name || ""}
        className="form-1-input"
        name="username"
        placeholder="JohnDoe12345"
        maxLength={20}
        minLength={5}
        required
      />
      <label className="form-1-label" htmlFor="phone">
        Phone Number
      </label>
      <input
        value={userData?.phone_number || ""}
        className="form-1-input"
        type="text"
        name="phone"
        placeholder="1234445566"
        onInput={handleInput}
        pattern="\d{10}"
        title="Phone number must be 10 digits"
        required
      />
      <label className="form-1-label" htmlFor="showtime">
        Showtime Preference
      </label>
      <select 
        value={userData?.showtime_preference || "morning"}
        className="form-1-select"
        name="showtime"
        required>
        <option value="morning" className='text-black'>Morning</option>
        <option value="afternoon" className='text-black'>Afternoon</option>
        <option value="evening" className='text-black'>Evening</option>
      </select>
      
      <SubmitButton
        formAction={formSubmit}
        className="form-1-submit-btn"
        pendingText="Signing Up..."
      >
        Continue
      </SubmitButton>
      <div className="flex justify-center items-center w-fit h-fit p-1 text-sm">
					{searchParams?.error && (
					<p className="p-4 bg-red-500 text-white text-center">
						Error:
					</p>
					)}
					{searchParams?.message && (
						<p className="p-4 text-center bg-gray-700">
							{searchParams.message}
						</p>
					)}
				</div>
    </form>
  );
}

export default SignUpStep1;
