import { DateSectionType } from "../../interface/interface";
import NewsItem from "./NewsItem";


function DateSection({ section }: { section: DateSectionType }) {
  return (
    <section className="news__section">
      <h2 className="news__section-title">{section.date}</h2>
      <div className="news__list">
    {section.items.map((item: any) => (
          <NewsItem key={item.id} item={item}  />
        ))}  
         
            <div className="news__divider" />
          
   
      </div>
    </section>
  );
}
export default DateSection