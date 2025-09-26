import './BesiderMobile.css';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import DateSection from '../News/DateSection';
import { NewsItemType } from '../../interface/interface';
import { fetchNews } from '../../api/fetchNews';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarOpen } from '../../store/reducers/reducers';
import { openMenuSelector } from '../../store/selectors/selector';
import { useEffect, useState, useRef } from 'react';

function BesiderMobile() {
  const [articles, setArticles] = useState<Record<string, NewsItemType[]>>({});
  const [loading, setLoading] = useState(true);
  const sidebarOpen = useSelector(openMenuSelector);
  const seenArticleIds = useRef<Set<string>>(new Set());
  const dispatch = useDispatch();

  const clickToMenu = () => dispatch(setSidebarOpen(!sidebarOpen));

  useEffect(() => {
    const loadInitialNews = async () => {
      try {
        setLoading(true);
        const newArticles = await fetchNews();

        if ('error' in newArticles) {
          console.error('Ошибка загрузки новостей:', newArticles.error);
          return;
        }

        Object.values(newArticles).forEach(items => {
          items.forEach(item => seenArticleIds.current.add(item.id));
        });

        setArticles(newArticles);
      } catch (error) {
        console.error('Ошибка загрузки новостей:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialNews();
  }, []);

  useEffect(() => {
    const checkForNewNews = async () => {
      try {
        const newArticles = await fetchNews();
        let foundNew = false;

        setArticles(prev => {
          if ('error' in prev) {
            return prev;
          }

          const updated: Record<string, NewsItemType[]> = { ...prev };

          Object.entries(newArticles).forEach(([date, items]) => {
            if (!updated[date]) updated[date] = [];

            items.forEach((item: NewsItemType) => {
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
          console.log('Доступны новые новости!');
        }
      } catch (error) {
        console.error('Ошибка проверки новых новостей:', error);
      }
    };

    const interval = setInterval(checkForNewNews, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='page'>
      <Sidebar />
      <Header clickToMenu={clickToMenu} />

      <main className='content' role='main'>
        {loading ? (
          <Loader />
        ) : (
          Object.entries(articles).map(
            ([date, items]: [string, NewsItemType[]]) => (
              <DateSection
                key={date}
                section={{ date: `News for ${date}`, items }}
              />
            )
          )
        )}

        <Footer />
      </main>
    </div>
  );
}

export default BesiderMobile;
