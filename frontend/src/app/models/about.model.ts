export interface AboutResponse {
  _id?: string;
  description: string;
  email: string;
  location: string;
}
export interface AboutSaveResponse {
  message: string;
  about: AboutResponse;
}

export interface AboutForm {
  description: string;
  email: string;
  location: string;
}
