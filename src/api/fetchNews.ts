import axios from 'axios';
import getFallback from '../helpers/getFallBack';
import formatDate from '../helpers/helpers';
import {
  NewsItemType,
  NYTimesArticle,
  NYTimesResponse,
} from '../interface/interface';

const API_KEY = 'rJ7XaUF0IQZG7UYu0jp85Mdqpeu5MnbP';

export async function fetchNews(): Promise<{
  grouped: Record<string, NewsItemType[]>;
  error?: string;
}> {
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
  const errors: string[] = [];

  for (const proxyUrl of proxyUrls) {
    try {
      console.log(`Попытка через ${proxyUrl.split('/')[2]}`);

      const res = await axios.get<NYTimesResponse>(proxyUrl, {
        timeout: 10000,
      });

      if (res.status === 200 && res.data?.results) {
        data = res.data;
        console.log(`Успешно: ${proxyUrl.split('/')[2]}`);
        break;
      }
    } catch (err: any) {
      let errorMessage = '';

      if (err.response?.status === 429) {
        errorMessage = '429: Превышен лимит запросов';
      } else if (err.response?.status === 403) {
        errorMessage = '403: Доступ запрещен';
      } else {
        errorMessage = err?.message || 'Неизвестная ошибка';
      }

      errors.push(`${proxyUrl.split('/')[2]}: ${errorMessage}`);
      console.warn(`Ошибка на ${proxyUrl.split('/')[2]}:`, errorMessage);
    }
  }

  if (!data || !Array.isArray(data.results)) {
    console.error('Не удалось загрузиться ни с одного proxy');

    let errorMessage = 'Не удалось загрузить новости';

    if (errors.length > 0) {
      const has429 = errors.some(err => err.includes('429'));
      const has403 = errors.some(err => err.includes('403'));

      if (has429 && has403) {
        errorMessage =
          'Все сервисы недоступны: превышены лимиты запросов (429) и доступ запрещен (403)';
      } else if (has429) {
        errorMessage = 'Превышены лимиты запросов (429) на всех сервисах';
      } else if (has403) {
        errorMessage = 'Доступ запрещен (403) на всех сервисах';
      } else {
        errorMessage = `Ошибки: ${errors.join('; ')}`;
      }
    }

    return {
      grouped: getFallback(),
      error: errorMessage,
    };
  }

  const articlesData: NewsItemType[] = data.results.map(
    (article: NYTimesArticle, index: number) => {
      let thumb = '/assets/image.svg';

      if (article.media?.length) {
        const mediaMetadata = article.media[0]['media-metadata'];
        if (mediaMetadata?.length) {
          thumb = mediaMetadata[mediaMetadata.length - 1].url;
        }
      }

      return {
        id: article.id || `article-${index}-${Date.now()}`,
        source: article.source || 'NY Times',
        title: article.title || 'Заголовок недоступен',
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

  return { grouped };
}
