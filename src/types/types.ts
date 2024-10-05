export interface ParamsType {
  key?: string;
  id?: string;
}

export interface Companies {
  _id: string;
  companyName: string;
  companyImg: string;
}

export interface Services {
  _id: string;
  logo: JSX.Element | string;
  name: string;
  details: string;
}

export interface Projects {
  _id: string;
  title: string;
  description: string;
  live_link: string;
  preview_image: string;
  color: string;
}

export interface Expertises {
  _id: string;
  name: string;
  icon: JSX.Element | string;
  duration: string;
  delay: string;
  radiusSmall: string;
  radiusLarge: string;
}

export interface Feedbacks {
  _id: string;
  name: string;
  image: string;
  company: string;
  feedback: string;
  color: string;
}

export interface Hero {
  _id: string;
  email: string;
  contact: string;
  motto: string;
  headline: string;
  intro: string;
  logo: string;
}

export interface Newsletter {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type SocialMedia = {
  logo: File | string | null;
  link: string;
};

// Define the type for the socials state
export type SocialMediaState = {
  facebook: { logo: File | string | null; link: string };
  github: { logo: File | string | null; link: string };
  linkedin: { logo: File | string | null; link: string };
  medium: { logo: File | string | null; link: string };
  twitter: { logo: File | string | null; link: string };
  dailydev: { logo: File | string | null; link: string };
};

// Define the keys of SocialMediaState as a union of the platform names
export type Platform = keyof SocialMediaState;

export interface SingleSocial {
  _id: string;
  name: string;
  link: string;
  logo: string;
}
