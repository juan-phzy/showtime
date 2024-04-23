export type FormSubmitFunction = (formData: FormData) => Promise<void>;

export interface SignUpSearchParams {
  error: string;
  message: string;
  step: string;
}
  
export interface CinemaChoiceData {
  cinemas: CinemaData[];
  status: {
    count: string;
    device_datetime_sent: string;
    device_datetime_used: string;
    message: string | null;
    method: string;
    request_method: string;
    state: string;
    territory: string;
    version: string;
  }
}

export interface CinemaData {
  address: string;
  address2: string;
  cinema_id: string;
  cinema_name: string;
  city: string;
  county: string;
  distance: string;
  lat: string;
  lng: string;  
  logo_url: string;
  postcode: string;
  state: string;
}