import { useSelector } from 'react-redux';
import { NewsItemProps } from '../../interface/interface';
import { errorSelector } from '../../store/selectors/selector';
import * as S from './Newsitem.styled';

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
    <S.NewsItem
      $error={hasError}
      onClick={handleClick}
      aria-label={hasError ? `Ошибка: ${msgError}` : item.title}
    >
      <S.Thumb
        src={item.thumb}
        alt={hasError ? 'Ошибка загрузки изображения' : item.thumb}
      />
      <S.Body>
        <S.Meta>
          <S.Source>{hasError ? 'Ошибка' : item.source}</S.Source>
        </S.Meta>
        <S.Title>{hasError ? msgError : item.title}</S.Title>
        <S.Date>
          {hasError ? 'Попробуйте перезагрузить страницу' : item.date}
        </S.Date>
      </S.Body>
    </S.NewsItem>
  );
}

export default NewsItem;
