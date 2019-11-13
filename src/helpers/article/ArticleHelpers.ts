import {
  TextHelper,
  SmallTextHelper,
  ImgHelper
} from "prismic-helpers-sanitize";
import { SEOhelper } from "../SEOhelper";
import { sliceHelper } from "../slice-helpers/SliceHelpers";
import { ISingleArticlePage } from "../../types/article.types";

export const singleArticleHelper = (data: any): ISingleArticlePage | null => {
  if (!data || !data.data) return null;
  const articleData: any = data.data;

  const article: ISingleArticlePage = {
    uid: data.uid,
    title: TextHelper(articleData.title),
    short_description: TextHelper(articleData.short_description),
    series: TextHelper(articleData.series),
    categories: TextHelper(articleData.categories),
    tags: TextHelper(articleData.tags),
    date: SmallTextHelper(articleData.date),
    small_img: ImgHelper(articleData.small_img),
    big_img: ImgHelper(articleData.big_img),
    author:
      articleData.author && articleData.author.data
        ? {
            uid: SmallTextHelper(articleData.author.data.uid),
            full_name: TextHelper(articleData.author.data.full_name),
            short_description: TextHelper(
              articleData.author.data.short_description
            ),
            image_avatar: ImgHelper(articleData.author.data.image_avatar)
          }
        : null,
    SEO: SEOhelper(articleData),
    content: sliceHelper(articleData.body)
  };

  return article;
};
