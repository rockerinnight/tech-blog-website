import { SingleArticle } from './single-article';

export interface MultiArticle {
  articles: SingleArticle[];
  articlesCount: number;
}
