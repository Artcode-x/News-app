import getFallback from '../helpers/getFallBack';
import formatDate from '../helpers/helpers';
import {
  NewsItemType,
  NYTimesArticle,
  NYTimesResponse,
} from '../interface/interface';

const API_KEY = 'rJ7XaUF0IQZG7UYu0jp85Mdqpeu5MnbP';

export async function fetchNews(): Promise<
  Record<string, NewsItemType[]> | { error: string }
> {
  const proxyUrls = [
    `https://corsproxy.io/?${encodeURIComponent(
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`
    )}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`
    )}`,
    `https://cors-anywhere.herokuapp.com/https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`,
    `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`
    )}`,
  ];

  let data: NYTimesResponse | null = null;
  let lastError: Error | null = null;

  for (const proxyUrl of proxyUrls) {
    try {
      console.log(`Пробую proxy: ${proxyUrl.split('/')[2]}`);

      const res = await fetch(proxyUrl, {
        headers: { 'x-requested-with': 'XMLHttpRequest' },
        signal: AbortSignal.timeout(10000),
      });

      if (res.ok) {
        data = await res.json();
        console.log(`Загружено успешно с: ${proxyUrl.split('/')[2]}`);
        break;
      } else {
        console.warn(`Неудачная попытка загрузки: ${res.status}`);
      }
    } catch (error) {
      lastError = error as Error;
      console.warn(`Ошибка proxy: ${proxyUrl.split('/')[2]}`, error);
      continue;
    }
  }

  if (!data) {
    console.error(
      'Не удалось загрузиться ни с одного proxy, использованы fallback данные',
      lastError
    );
    return getFallback();
  }

  try {
    const articlesData: NewsItemType[] = data.results.map(
      (article: NYTimesArticle, index: number) => {
        let thumb = '../assets/image.svg';

        if (article.media && article.media.length > 0) {
          const mediaMetadata = article.media[0]['media-metadata'];
          if (mediaMetadata && mediaMetadata.length > 0) {
            const largestImage = mediaMetadata[mediaMetadata.length - 1];
            thumb = largestImage.url;
          }
        }

        return {
          id: article.id || `article-${index}-${Date.now()}`,
          source: article.source || 'NY Times',
          title: article.title || 'No title available',
          date: formatDate(article.published_date || new Date().toISOString()),
          thumb: thumb,
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
      if (!grouped[day]) {
        grouped[day] = [];
      }
      grouped[day].push(article);
    });

    console.log(`Успешно загружено ${articlesData.length} новостей`);
    return grouped;
  } catch (error) {
    console.error('Ошибка обработки данных API:', error);
    return getFallback();
  }
}
