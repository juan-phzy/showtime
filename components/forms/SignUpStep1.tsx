import React from 'react';
import { SubmitButton } from '../buttons/SubmitButton';

import { SignUpSearchParams, FormSubmitFunction } from "@/utils/constants";


interface SignUpFormProps {
    formSubmit: FormSubmitFunction;
    searchParams: SignUpSearchParams;
  }

const SignUpStep1: React.FC<SignUpFormProps> = ({ formSubmit, searchParams }) => {
  return (
    <form className="form-1">
      <label className="text-md" htmlFor="username">
        Username
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border"
        name="username"
        placeholder="JohnDoe12345"
        required
      />
      <label className="text-md" htmlFor="phone">
        Phone Number
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border"
        type="text"
        name="phone"
        placeholder="1234445566"
        required
      />
      <label className="text-md" htmlFor="showtime">
        Showtime Preference
      </label>
      <select 
        className="rounded-md px-4 py-2 bg-inherit border"
        name="showtime"
        required>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
      </select>
      
      <SubmitButton
        formAction={formSubmit}
        className="border border-foreground/20 rounded-md px-4 py-2 text-foreground"
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
