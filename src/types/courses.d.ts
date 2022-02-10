export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  author_name: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  content: {
    id: string;
    description: string;
    type: string;
    location: string;
  }[];
}

export interface UserCourse extends Course {
  ongoing: boolean;
  finished: boolean;
}
