export interface TagProps {
  name: string;
}

export interface BlogPostProps {
  id: number;
  title: string;
  image: string;
  excerpt: string;
  date: string;
  author: string;
  authorImage: string;
  readTime: string;
  category: string;
  tags: TagProps[];
  delay?: string;
  featured?: boolean;
}
