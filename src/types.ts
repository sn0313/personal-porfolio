export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details: string;
}
