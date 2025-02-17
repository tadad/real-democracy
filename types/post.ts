export interface PostMeta {
  title: string;
  date: string;
  slug: string;
  description?: string;
  tags?: string[];
  excerpt?: string;
}

export interface Post extends PostMeta {
  content: string;
}
