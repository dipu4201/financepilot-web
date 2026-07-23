export interface Author {
  id: number;
  name: string;
  slug: string;
  avatar_url: string | null;
  bio: string | null;
  title: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
}

export interface Media {
  id: number;
  url: string;
  alt_text: string | null;
  width: number | null;
  height: number | null;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  status: string;
  published_at: string | null;
  reading_time_minutes: number | null;
  views: number;
  is_featured: boolean;
  is_trending: boolean;
  is_editors_pick: boolean;
  author: Author;
  category: Category;
  featured_media: Media | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  total: number;
}
