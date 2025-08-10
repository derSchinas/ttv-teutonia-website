// types/database.ts

// Fügen Sie diesen Typ hinzu oder erweitern Sie die Datei
export type NewsArticle = {
  id: string;
  created_at: string;
  title: string;
  content: string;
  is_published: boolean;
  featured_image: string | null;
  author_id: string | null;
  author: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}