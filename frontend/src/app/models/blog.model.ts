export interface BlogResponse {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogSaveResponse {
  message: string;
  blog: BlogResponse;
}

export interface BlogApiResponse {
  message: string;
}

export interface BlogForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  published: boolean;
  imageFile: File | null;
}
