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
  const [loading, setLoading] = useState<boolean>(true);
  const sidebarOpen = useSelector(openMenuSelector);
  const seenArticleIds = useRef<Set<string>>(new Set());
  const dispatch = useDispatch();

  const clickToMenu = () => dispatch(setSidebarOpen(!sidebarOpen));

  useEffect(() => {
    const loadInitialNews = async () => {
      setLoading(true);
      const newArticles = await fetchNews();
      console.log(newArticles);

      Object.values(newArticles).forEach(items => {
        items.forEach(item => seenArticleIds.current.add(item.id));
      });

      setArticles(newArticles);
      setLoading(false);
    };

    loadInitialNews();
  }, []);

  useEffect(() => {
    const checkForNewNews = async () => {
      const newArticles = await fetchNews();
      let foundNew = false;

      setArticles(prev => {
        const updated: Record<string, NewsItemType[]> = { ...prev };

        Object.entries(newArticles).forEach(([date, items]) => {
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
    <div className='page'>
      <Sidebar />
      <Header clickToMenu={clickToMenu} />

      <main className='content' role='main'>
        {loading ? (
          <Loader />
        ) : (
          Object.entries(articles).map(([date, items]) => (
            <DateSection
              key={date}
              section={{ date: `News for ${date}`, items }}
            />
          ))
        )}
        <Footer />
      </main>
    </div>
  );
}

export default BesiderMobile;
