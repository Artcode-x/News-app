import { useSelector } from 'react-redux';
import { NewsItemProps } from '../../interface/interface';
import { errorSelector } from '../../store/selectors/selector';
import './Newsitem.css';

function NewsItem({ item }: NewsItemProps) {
  const msgError = useSelector(errorSelector) as string | null;
  const isValidUrl: boolean = !!(item.url && item.url.startsWith('http'));
  const hasError = Boolean(msgError);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    if (item.url && isValidUrl && !hasError) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article
      className={`news__item ${hasError ? 'news__item--error' : ''}`}
      aria-label={hasError ? `Ошибка: ${msgError}` : item.title}
      onClick={handleClick}
      style={{ cursor: hasError ? 'not-allowed' : 'pointer' }}
    >
      <img
        src={item.thumb}
        className='news__thumb'
        // width={72}
        // height={72}
        alt={hasError ? 'Ошибка загрузки изображения' : item.thumb}
      />
      <div className='news__body'>
        <div className='news__meta'>
          <span className='news__source'>
            {hasError ? 'Ошибка' : item.source}
          </span>
        </div>
        <h3 className='news__title'>{hasError ? msgError : item.title}</h3>
        <time className='news__date'>
          {hasError ? 'Попробуйте перезагрузить страницу' : item.date}
        </time>
      </div>
    </article>
  );
}

export default NewsItem;
