export interface SingleArticleCreateDto {
  article: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  };
}
