import { DateSectionType } from '../../interface/interface';
import NewsItem from './NewsItem';

function DateSection({ section }: { section: DateSectionType }) {
  return (
    <section className='news__section'>
      <h2 className='news__section-title'>{section.date}</h2>
      <div className='news__list'>
        {section.items.map((item, index) => (
          <div key={`${section.date}_${item.id}_${index}`}>
            <NewsItem item={item} />
            <div className='news__divider' />
          </div>
        ))}
      </div>
    </section>
  );
}

export default DateSection;
