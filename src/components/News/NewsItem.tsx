import { NewsItemProps } from "../../interface/interface";
import "./Newsitem.css";

function NewsItem({ item }: NewsItemProps) {
  return (
    <article className="news__item" role="article">
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
