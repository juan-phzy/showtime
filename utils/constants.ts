export type FormSubmitFunction = (formData: FormData) => Promise<void>;
export interface SearchParams {
    message: string;
    joe?: string;
  }
  