import getFallback from '../helpers/getFallBack';
import formatDate from '../helpers/helpers';
import {
  NewsItemType,
  NYTimesArticle,
  NYTimesResponse,
} from '../interface/interface';

const API_KEY = 'rJ7XaUF0IQZG7UYu0jp85Mdqpeu5MnbP';

export async function fetchNews(): Promise<Record<string, NewsItemType[]>> {
  const proxyUrls = [
    `https://corsproxy.io/?${encodeURIComponent(
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`
    )}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`
    )}`,
    `https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`,
  ];

  let data: NYTimesResponse | null = null;

  for (const proxyUrl of proxyUrls) {
    try {
      console.log(`Попытка через ${proxyUrl.split('/')[2]}`);
      const res = await fetch(proxyUrl);

      if (res.ok) {
        data = await res.json();
        console.log(data);
        console.log(data?.results);
        console.log(`Успешно: ${proxyUrl.split('/')[2]}`);
        break;
      }
    } catch (error) {
      console.warn(`Ошибка на ${proxyUrl.split('/')[2]}`, error);
      continue;
    }
  }

  if (!data || !Array.isArray(data.results)) {
    console.error(
      'Не удалось загрузиться ни с одного proxy, использованы fallback данные'
    );
    return getFallback();
  }

  const articlesData: NewsItemType[] = data.results.map(
    (article: NYTimesArticle, index: number) => {
      let thumb = '../assets/image.svg';

      if (article.media?.length) {
        const mediaMetadata = article.media[0]['media-metadata'];
        if (mediaMetadata?.length) {
          thumb = mediaMetadata[mediaMetadata.length - 1].url;
        }
      }

      return {
        id: article.id || `article-${index}-${Date.now()}`,
        source: article.source || 'NY Times',
        title: article.title || 'No title available',
        date: formatDate(article.published_date || new Date().toISOString()),
        thumb,
        url: article.url || '#',
      };
    }
  );

  articlesData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const grouped: Record<string, NewsItemType[]> = {};
  articlesData.forEach(article => {
    const day = new Date(article.date).toLocaleDateString('en-CA');
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(article);
  });

  return grouped;
}
