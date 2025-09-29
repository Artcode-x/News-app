import { DateSectionType } from '../../interface/interface';
import NewsItem from './NewsItem';
import * as S from './Newsitem.styled';

function DateSection({ section }: { section: DateSectionType }) {
  return (
    <S.Section>
      <S.SectionTitle>{section.date}</S.SectionTitle>
      <S.List>
        {section.items.map((item, index) => (
          <div key={`${section.date}_${item.id}_${index}`}>
            <NewsItem item={item} />
            <S.Divider />
          </div>
        ))}
      </S.List>
    </S.Section>
  );
}

export default DateSection;
