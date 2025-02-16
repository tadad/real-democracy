export interface PostMeta {
  title: string;
  date: string;
  slug: string;
  description?: string;
  tags?: string[];
}

export interface Post extends PostMeta {
  content: string;
  readingTime?: string;
} 