export interface NewsItemType {
  id: string;
  source: string;
  title: string;
  date: string;
  thumb: string;
  url?: string;
  originalDate?: Date;
}

export interface DateSectionType {
  date: string;
  items: NewsItemType[];
}

export interface NewsItemProps {
  item: NewsItemType;
}

export interface Article {
  id: string;
  source: string;
  title: string;
  date: string;
  thumb?: string;
  url: string;
}

export interface SidebarProps {
  onClose: () => void;
}
