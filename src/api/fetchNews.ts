import formatDate from "../helpers/helpers";
import { NewsItemType } from "../interface/interface";

const API_KEY = "rJ7XaUF0IQZG7UYu0jp85Mdqpeu5MnbP";

export async function fetchNews(): Promise<Record<string, NewsItemType[]>> {
  const now = new Date();
  const year = now.getFullYear();
  const month = Math.max(1, Math.min(12, now.getMonth() + 1));

  // по каким то причинам апи не выводит посты за последний месяц, поэтому в url пишу хардкодом.

  const url = `https://corsproxy.io/?${encodeURIComponent(
    `https://api.nytimes.com/svc/archive/v1/${year}/5.json?api-key=${API_KEY}`
  )}`;
  const res = await fetch(url, {
    headers: { "x-requested-with": "XMLHttpRequest" },
  });
  const data = await res.json();
  console.log(data);

  const articlesData: NewsItemType[] = data.response.docs.map((doc: any) => {
    const thumb =
      doc.multimedia?.length > 0
        ? "https://www.nytimes.com/" + doc.multimedia[0].url
        : "/assets/image.svg";

    return {
      id: doc._id,
      source: doc.source || "Unknown",
      title: doc.abstract || "No title",
      date: formatDate(doc.pub_date),
      thumb,
      url: doc.web_url,
    };
  });

  // сорт по дате (сначала свежие)
  articlesData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // груп по дате
  const grouped: Record<string, NewsItemType[]> = {};

  articlesData.forEach((a) => {
    const day = new Date(a.date).toLocaleDateString("en-CA");
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(a);
  });

  return grouped;
}
