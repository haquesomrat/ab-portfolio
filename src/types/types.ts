export interface ParamsType {
  key?: string;
  id?: string;
}

export interface Services {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Projects {
  id: number;
  title: string;
  description: string;
  live_link: string;
  preview_image: string;
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
