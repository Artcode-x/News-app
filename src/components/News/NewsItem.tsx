import { NewsItemProps } from "../../interface/interface";
import "./Newsitem.css";

function NewsItem({ item }: NewsItemProps) {
  // console.log({ item });
  const isValidUrl = item.url && item.url.startsWith("http");
  const link = isValidUrl ? item.url! : "https://www.nytimes.com/";

  const handleClick = () => {
    if (item.url) {
      window.open(item.url, "_blank");
      // или window.location.href = item.url; // как вар в тек вкладке
    }
  };

  return (
    <article
      className="news__item"
      role="article"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img src={item.thumb} className="news__thumb" width={72} height={72} />
      <div className="news__body">
        <div className="news__meta">
          <span className="news__source">{item.source}</span>
        </div>
        <h3 className="news__title">{item.title}</h3>
        <time className="news__date">{item.date}</time>
      </div>
    </article>
  );
}
export default NewsItem;
