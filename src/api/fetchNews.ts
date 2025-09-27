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
  let lastError: string | undefined;

  for (const proxyUrl of proxyUrls) {
    try {
      console.log(`🔄 Попытка через ${proxyUrl.split('/')[2]}`);

      const res = await axios.get<NYTimesResponse>(proxyUrl, {
        timeout: 10000,
      });

      if (res.status === 200 && res.data?.results) {
        data = res.data;
        console.log(`✅ Успешно: ${proxyUrl.split('/')[2]}`);
        break;
      }
    } catch (err: any) {
      lastError = err?.message || 'Неизвестная ошибка';
      console.log(lastError);
      console.warn(`❌ Ошибка на ${proxyUrl.split('/')[2]}:`, lastError);
    }
  }

  if (!data || !Array.isArray(data.results)) {
    console.error('Не удалось загрузиться ни с одного proxy');
    return {
      grouped: getFallback(),
      error: lastError || 'Ошибка загрузки данных',
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
