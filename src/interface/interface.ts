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

export interface AppState {
  sidebarOpen: boolean;
}

export interface NYTimesArticle {
  id: string;
  source: string;
  title: string;
  published_date: string;
  url: string;
  media?: Array<{
    "media-metadata": Array<{
      url: string;
      format: string;
    }>;
  }>;
}

export interface NYTimesResponse {
  results: NYTimesArticle[];
  status: string;
  copyright: string;
  num_results?: number;
}

export interface HeaderProps {
  clickToMenu: () => void;
}

export interface LoaderProps {
  size?: "small" | "medium" | "large";
  color?: string;
}
