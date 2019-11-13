import { TextHelper, ImgHelper } from "prismic-helpers-sanitize";
import { SEOhelper } from "../SEOhelper";
import { sliceHelper } from "../slice-helpers/SliceHelpers";

import { IAuthorSingle } from "../../types/author.types";

export const authorPageHelper = (data: any): any | null => {
  if (!data || !data.data) return null;

  const authorData = data.data;

  const author: IAuthorSingle = {
    uid: data.uid,
    id: data.id,
    short_description: TextHelper(authorData.short_description),
    full_name: TextHelper(authorData.full_name),
    image: ImgHelper(authorData.image),
    image_avatar: ImgHelper(authorData.image_avatar),
    email: TextHelper(authorData.email),
    instagram: TextHelper(authorData.instagram),
    facebook: TextHelper(authorData.facebook),
    github: TextHelper(authorData.github),
    linkedin: TextHelper(authorData.linkedin),
    content: sliceHelper(authorData.body)
  };

  return {
    [author.uid]: {
      author,
      SEO: SEOhelper(authorData),
      articles: []
    }
  };
};
