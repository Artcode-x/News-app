import { NewsItemType } from "../interface/interface";

export function groupArticlesByDate(
  articles: NewsItemType[]
): Record<string, NewsItemType[]> {
  return articles.reduce((acc, article) => {
    const day = new Date(article.date).toLocaleDateString("en-CA"); // YYYY-MM-DD
    if (!acc[day]) acc[day] = [];
    acc[day].push(article);
    return acc;
  }, {} as Record<string, NewsItemType[]>);
}
