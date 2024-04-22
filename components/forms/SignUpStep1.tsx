import React from 'react';
import { SubmitButton } from '../buttons/SubmitButton';

import { SearchParams, FormSubmitFunction } from "@/utils/constants";


interface SignUpFormProps {
    formSubmit: FormSubmitFunction;
    searchParams: SearchParams;
  }

const SignUpStep1: React.FC<SignUpFormProps> = ({ formSubmit, searchParams }) => {
  return (
    <form className="form-1">
      <label className="text-md" htmlFor="username">
        Username
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="username"
        placeholder="JohnDoe12345"
        required
      />
      <label className="text-md" htmlFor="phone">
        Phone Number
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="text"
        name="phone"
        placeholder="1234445566"
        required
      />
      <label className="text-md" htmlFor="showtime">
        Showtime Preference
      </label>
      <select 
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="showtime"
        required>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
      </select>
      
      <SubmitButton
        formAction={formSubmit}
        className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
        pendingText="Signing Up..."
      >
        Continue
      </SubmitButton>
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
          {searchParams.joe}
        </p>
      )}
    </form>
  );
}

export default SignUpStep1;
