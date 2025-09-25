import formatDate from "../helpers/helpers";
import { NewsItemType } from "../interface/interface";

const API_KEY = "rJ7XaUF0IQZG7UYu0jp85Mdqpeu5MnbP";

export async function fetchNews(): Promise<Record<string, NewsItemType[]>> {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  // const url = `https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=rJ7XaUF0IQZG7UYu0jp85Mdqpeu5MnbP`;
  // const url = `/svc/archive/v1/${year}/${month}.json?api-key=rJ7XaUF0IQZG7UYu0jp85Mdqpeu5MnbP`;
  // https://api.nytimes.com/svc/archive/v1/2024/june.json?api-key=rJ7XaUF0IQZG7UYu0jp85Mdqpeu5MnbP
  const url = `https://corsproxy.io/?${encodeURIComponent(
    `https://api.nytimes.com/svc/archive/v1/${year}/1.json?api-key=${API_KEY}`
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
        : "/assets/default-thumb.png";

    return {
      id: doc._id,
      source: doc.source || "Unknown",
      title: doc.abstract || "No title",
      date: formatDate(doc.pub_date),
      thumb,
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
