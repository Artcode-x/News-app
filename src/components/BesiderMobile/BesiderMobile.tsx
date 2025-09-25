import "./BesiderMobile.css";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import DateSection from "../News/DateSection";
import { useEffect, useState } from "react";
import { NewsItemType } from "../../interface/interface";
import { fetchNews } from "../../api/fetchNews";

function BesiderMobile() {
  const [articles, setArticles] = useState<Record<string, NewsItemType[]>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const clickToMenu = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setSidebarOpen(false);
  };

  const loadNews = async () => {
    try {
      setLoading(true);
      const grouped = await fetchNews();
      console.log(grouped);
      setArticles(grouped);
    } catch (err) {
      console.error("Ошибка загрузки новостей", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(loadNews, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">
      <Sidebar open={sidebarOpen} onClose={closeMenu} />
      <Header clickToMenu={clickToMenu} />

      <main className="content" role="main">
        {!loading &&
          Object.entries(articles).map(([date, items]) => (
            <DateSection
              key={date}
              section={{ date: `News for ${date}`, items }}
            />
          ))}
        <Loader />
        <Footer />
      </main>
    </div>
  );
}

export default BesiderMobile;
