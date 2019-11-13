import { IPrismicConnection, IImg, ISEO } from "./common.types";
import { TAllSlices } from "./slices.types";
/**
|--------------------------------------------------
| Author types
|--------------------------------------------------
*/

//get author articles
export interface IgetRelatedToAuthorArticles {
  prismicConnection: IPrismicConnection;
  userId: string;
}

//single author
export interface IAuthorSingle {
  uid: string;
  id: string | null;
  short_description: string | null;
  full_name: string | null;
  image: IImg | null;
  image_avatar: IImg | null;
  email: string | null;
  instagram: string | null;
  facebook: string | null;
  github: string | null;
  linkedin: string | null;
  content: Array<TAllSlices> | null;
  articles?: Array<any>;
}

//author single page
export interface IAuthorSinglePage {
  error?: boolean;
  author: IAuthorSingle;
  SEO: ISEO;
  articles: Array<any>;
}

export interface ISmallAuthor {
  uid: string | null;
  full_name: string | null;
  short_description: string | null;
  image_avatar: IImg | null;
}
