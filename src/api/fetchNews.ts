import { groupArticlesByDate } from "../helpers/groupByDate";
import formatDate from "../helpers/helpers";
import { NewsItemType } from "../interface/interface";

const API_KEY = "rJ7XaUF0IQZG7UYu0jp85Mdqpeu5MnbP";

function getFallback(): Record<string, NewsItemType[]> {
  const today = new Date().toISOString().split("T")[0];
  return {
    [today]: [
      {
        id: "fallback",
        source: "NY Times",
        title: "Новости временно недоступны. Попробуйте позже.",
        date: formatDate(new Date().toISOString()),
        thumb: "../assets/image.svg",
        url: "#",
      },
    ],
  };
}

export async function fetchNews(): Promise<Record<string, NewsItemType[]>> {
  const baseUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`;

  const proxyUrls = [
    `https://corsproxy.io/?${encodeURIComponent(baseUrl)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(baseUrl)}`,
    `https://cors-anywhere.herokuapp.com/${baseUrl}`,
    `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(baseUrl)}`,
  ];

  let data: any = null;

  for (const proxyUrl of proxyUrls) {
    try {
      console.log(`Попытка через ${proxyUrl.split("/")[2]}`);
      const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(10000) });

      if (res.ok) {
        data = await res.json();
        console.log(`Успешно: ${proxyUrl.split("/")[2]}`);
        break;
      }
    } catch (err) {
      console.warn(`Ошибка на ${proxyUrl.split("/")[2]}`, err);
    }
  }

  if (!data) {
    console.error("Не удалось загрузить новости ни с одного прокси");
    return getFallback();
  }

  try {
    let articles: NewsItemType[] = data.results.map((a: any, i: number) => {
      const thumb =
        a.media?.[0]?.["media-metadata"]?.slice(-1)[0]?.url ||
        "../assets/image.svg";

      return {
        id: a.id || `article-${i}`,
        source: a.source || "NY Times",
        title: a.title || "Без заголовка",
        date: formatDate(a.published_date || new Date().toISOString()),
        thumb,
        url: a.url || "#",
      };
    });

    articles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const unique: NewsItemType[] = [];
    const seenIds = new Set<string>();
    for (const art of articles) {
      if (!seenIds.has(art.id)) {
        seenIds.add(art.id);
        unique.push(art);
      } else {
        console.warn("Отфильтрованные дубликаты статей:", art.id);
      }
    }

    return groupArticlesByDate(unique);
  } catch (err) {
    console.error("Ошибка обработки данных:", err);
    return getFallback();
  }
}
