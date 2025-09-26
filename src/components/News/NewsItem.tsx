import { NewsItemProps } from '../../interface/interface';
import './Newsitem.css';

function NewsItem({ item }: NewsItemProps) {
  const isValidUrl: boolean = !!(item.url && item.url.startsWith('http'));

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    if (item.url && isValidUrl) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article
      className='news__item'
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={item.thumb}
        className='news__thumb'
        width={72}
        height={72}
        alt={item.title}
      />
      <div className='news__body'>
        <div className='news__meta'>
          <span className='news__source'>{item.source}</span>
        </div>
        <h3 className='news__title'>{item.title}</h3>
        <time className='news__date'>{item.date}</time>
      </div>
    </article>
  );
}

export default NewsItem;
