export interface SingleArticleUpdateDto {
  article: {
    title?: string;
    description?: string;
    body?: string;
    tagList?: string[];
  };
}
