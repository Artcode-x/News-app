export interface NewsItemType {
  id: string;
  source: string;
  title: string;
  date: string;
  thumb: string;
}

export interface DateSectionType {
  date: string;
  items: NewsItemType[];
}

export interface NewsItemProps {
  item: NewsItemType;
}