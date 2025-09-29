import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';
import DateSection from '../News/DateSection';
import { fetchNews } from '../../api/fetchNews';
import { NewsItemType } from '../../interface/interface';
import {
  clearError,
  setError,
  setSidebarOpen,
} from '../../store/reducers/reducers';
import {
  errorSelector,
  openMenuSelector,
} from '../../store/selectors/selector';
import * as S from './BesiderMobile.styled';

function BesiderMobile() {
  const [articles, setArticles] = useState<Record<string, NewsItemType[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const seenArticleIds = useRef<Set<string>>(new Set());

  const dispatch = useDispatch();

  const sidebarOpen = useSelector(openMenuSelector);
  const msgError = useSelector(errorSelector);

  const clickToMenu = () => dispatch(setSidebarOpen(!sidebarOpen));

  useEffect(() => {
    const loadInitialNews = async () => {
      setLoading(true);
      const { grouped, error } = await fetchNews();

      if (error) {
        console.log(`!test ${error}`);
        dispatch(setError(error));
      } else {
        dispatch(clearError(null));
      }

      Object.values(grouped).forEach(items => {
        items.forEach(item => seenArticleIds.current.add(item.id));
      });

      setArticles(grouped);
      setLoading(false);
    };

    loadInitialNews();
  }, []);

  useEffect(() => {
    const checkForNewNews = async () => {
      const { grouped } = await fetchNews();
      let foundNew = false;

      setArticles(prev => {
        const updated: Record<string, NewsItemType[]> = { ...prev };

        Object.entries(grouped).forEach(([date, items]) => {
          if (!updated[date]) updated[date] = [];

          items.forEach(item => {
            if (!seenArticleIds.current.has(item.id)) {
              seenArticleIds.current.add(item.id);
              updated[date].unshift(item);
              foundNew = true;
            }
          });
        });

        return updated;
      });

      if (foundNew) {
        console.log('Новые новости добавлены');
      }
    };

    const interval = setInterval(checkForNewNews, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <S.Page>
      <Sidebar />
      <Header clickToMenu={clickToMenu} />

      <S.Content role='main'>
        {loading ? (
          <Loader />
        ) : msgError ? (
          <S.ErrorMessage>
            <div>⚠️</div>
            Ошибка загрузки новостей:{' '}
            <S.ErrorMessageReason>{msgError}</S.ErrorMessageReason>
          </S.ErrorMessage>
        ) : (
          Object.entries(articles).map(([date, items]) => (
            <DateSection
              key={date}
              section={{ date: `News for ${date}`, items }}
            />
          ))
        )}
        <Footer />
      </S.Content>
    </S.Page>
  );
}

export default BesiderMobile;
