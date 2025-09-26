import "./BesiderMobile.css";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import DateSection from "../News/DateSection";
import { useEffect, useState } from "react";
import { NewsItemType } from "../../interface/interface";
import { fetchNews } from "../../api/fetchNews";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarOpen } from "../../store/reducers/reducers";
import { openMenuSelector } from "../../store/selectors/selector";

function BesiderMobile() {
  const [articles, setArticles] = useState<Record<string, NewsItemType[]>>({});
  const [loading, setLoading] = useState(true);
  const [seen, setSeen] = useState<Set<string>>(new Set());

  const sidebarOpen = useSelector(openMenuSelector);
  const dispatch = useDispatch();

  const clickToMenu = () => dispatch(setSidebarOpen(!sidebarOpen));

  const loadNews = async (checkNew = false) => {
    try {
      if (!checkNew) setLoading(true);

      const newArticles = await fetchNews();

      setArticles((prev) => {
        const updated = { ...prev };
        const newSeen = new Set(seen);

        Object.entries(newArticles).forEach(([date, items]) => {
          if (!updated[date]) updated[date] = [];

          const itemsToAdd: NewsItemType[] = [];
          for (const item of items) {
            if (!checkNew || !newSeen.has(item.id)) {
              itemsToAdd.push(item);
              newSeen.add(item.id);
            }
          }

          if (itemsToAdd.length) {
            updated[date] = [...itemsToAdd, ...updated[date]];
          }
        });

        setSeen(newSeen);
        return updated;
      });
    } catch (err) {
      console.error("Ошибка загрузки:", err);
    } finally {
      if (!checkNew) setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => loadNews(true), 30000);
    return () => clearInterval(interval);
  }, [seen]);

  return (
    <div className="page">
      <Sidebar />
      <Header clickToMenu={clickToMenu} />

      <main className="content" role="main">
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
