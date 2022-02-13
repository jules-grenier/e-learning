export interface CourseFile {
  id: string;
  name: string;
  type: string;
  location: string;
}

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
    [key: string]: CourseFile[];
  }[];
}

export interface UserCourse extends Course {
  ongoing: boolean;
  finished: boolean;
}
