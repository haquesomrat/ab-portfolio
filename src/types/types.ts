export interface ParamsType {
  key?: string;
  id?: string;
}

export interface Services {
  _id: string | JSX.Element;
  logo: string;
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
  id: number;
  name: string;
  logo: string;
}

export interface Feedbacks {
  id: number;
  name: string;
  image: string;
  company: string;
  feedback: string;
}
