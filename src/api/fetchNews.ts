import formatDate from "../helpers/helpers";
import { NewsItemType } from "../interface/interface";

const API_KEY = "rJ7XaUF0IQZG7UYu0jp85Mdqpeu5MnbP";

function getFallbackData(): Record<string, NewsItemType[]> {
  const today = new Date().toISOString().split("T")[0];
  return {
    [today]: [
      {
        id: "fallback-1",
        source: "NY Times",
        title:
          "Latest news will appear here soon. API might be temporarily unavailable.",
        date: formatDate(new Date().toISOString()),
        thumb: "../assets/image.svg",
        url: "#",
      },
    ],
  };
}

export async function fetchNews(): Promise<Record<string, NewsItemType[]>> {
  const now = new Date();
  const year = now.getFullYear();
  const month = 5;

  const proxyUrls = [
    `https://corsproxy.io/?${encodeURIComponent(
      `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${API_KEY}`
    )}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(
      `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${API_KEY}`
    )}`,
    `https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${API_KEY}`,
    `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(
      `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${API_KEY}`
    )}`,
  ];

  let data: any = null;
  let lastError: Error | null = null;

  for (const proxyUrl of proxyUrls) {
    try {
      console.log(`Пробую proxy: ${proxyUrl.split("/")[2]}`);

      const res = await fetch(proxyUrl, {
        headers: { "x-requested-with": "XMLHttpRequest" },
        signal: AbortSignal.timeout(10000),
      });

      if (res.ok) {
        data = await res.json();
        console.log(`Загружено успешно с: ${proxyUrl.split("/")[2]}`);
        break;
      } else {
        console.warn(`Неудачная попытка загрузки: ${res.status}`);
      }
    } catch (error) {
      lastError = error as Error;
      console.warn(`Ошибка proxy : ${proxyUrl.split("/")[2]}`, error);
      continue;
    }
  }

  if (!data) {
    console.error(
      "Не удалось загрузиться ни с одного proxy, использованы fallback данные",
      lastError
    );
    return getFallbackData();
  }

  try {
    const articlesData: NewsItemType[] = data.response.docs.map((doc: any) => {
      const thumb =
        doc.multimedia?.length > 0
          ? "https://www.nytimes.com/" + doc.multimedia[0].url
          : "../assets/image.svg";

      return {
        id: doc._id,
        source: doc.source || "Unknown",
        title: doc.abstract || "No title",
        date: formatDate(doc.pub_date),
        thumb,
        url: doc.web_url,
      };
    });

    articlesData.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const grouped: Record<string, NewsItemType[]> = {};
    articlesData.forEach((a) => {
      const day = new Date(a.date).toLocaleDateString("en-CA");
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(a);
    });

    return grouped;
  } catch (error) {
    console.error("Ошибка получения данных с API:", error);
    return getFallbackData();
  }
}
