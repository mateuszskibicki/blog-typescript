import {
  TextHelper,
  SmallTextHelper,
  ImgHelper
} from "prismic-helpers-sanitize";
import { SEOhelper } from "../SEOhelper";

import { ISEO } from "../../types/common.types";
import { ISingleArticle } from "../../types/article.types";

export const articlesListHelper = (data: any): ISingleArticle[] | null => {
  if (!data || !data.results) return null;
  const articlesData: any = data.results;

  const articles: ISingleArticle[] = articlesData.map(
    (article: any): ISingleArticle => ({
      uid: article.uid,
      title: TextHelper(article.data.title),
      short_description: TextHelper(article.data.short_description),
      series: TextHelper(article.data.series),
      categories: TextHelper(article.data.categories),
      tags: TextHelper(article.data.tags),
      date: SmallTextHelper(article.data.date),
      small_img: ImgHelper(article.data.small_img),
      xs_img: ImgHelper(article.data.xs_img),
      author:
        article.data.author && article.data.author.data
          ? {
              uid: SmallTextHelper(article.data.author.data.uid),
              full_name: TextHelper(article.data.author.data.full_name),
              short_description: TextHelper(
                article.data.author.data.short_description
              ),
              image_avatar: ImgHelper(article.data.author.data.image_avatar)
            }
          : null
    })
  );

  return articles;
};

export const allArticlesPageSEOHelper = (data: any): ISEO | null => {
  if (!data || !data.results || !data.results[0] || !data.results[0].data)
    return null;
  const SEOdata: any = data.results[0].data;
  return SEOhelper(SEOdata);
};
