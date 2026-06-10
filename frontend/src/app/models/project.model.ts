export interface ProjectResponse {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectSaveResponse {
  message: string;
  project: ProjectResponse;
}

export interface ProjectApiResponse {
  message: string;
}

export interface ProjectForm {
  title: string;
  description: string;
  category: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  imageFile: File | null;
}
