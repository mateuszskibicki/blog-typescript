import React from "react";
import { Helmet } from "react-helmet-async";

import { ISEO } from "../../types/common.types";

const HeadSEO: React.FC<{ SEO: ISEO }> = (props: {
  SEO: ISEO;
}): JSX.Element => {
  const {
    title = null,
    description = null,
    keywords = null,
    geo_region = null,
    robots = null,
    item_prop_name = null,
    item_prop_description = null,
    twitter_card = null,
    twitter_site = null,
    twitter_title = null,
    twitter_description = null,
    twitter_creator = null,
    og_title = null,
    og_type = null,
    og_url = null,
    og_description = null,
    og_site_name = null,
    article_section = null,
    article_tag = null,
    fb_admins = null,
    item_prop_image = null,
    twitter_image = null,
    og_image = null,
    article_published_time = null,
    article_modified_time = null
  } = props.SEO;

  // return <div></div>;

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {geo_region && <meta name="geo.region" content={geo_region} />}
      {robots && <meta name="robots" content={robots} />}
      {item_prop_name && <meta itemProp="name" content={item_prop_name} />}
      {item_prop_description && (
        <meta itemProp="description" content={item_prop_description} />
      )}
      {twitter_card && <meta name="twitter:card" content={twitter_card} />}
      {twitter_site && <meta name="twitter:site" content={twitter_site} />}
      {twitter_title && <meta name="twitter:title" content={twitter_title} />}
      {twitter_description && (
        <meta name="twitter:description" content={twitter_description} />
      )}
      {twitter_creator && (
        <meta name="twitter:creator" content={twitter_creator} />
      )}
      {og_type && <meta property="og:type" content={og_type} />}
      {og_title && <meta property="og:title" content={og_title} />}
      {og_url && <meta property="og:url" content={og_url} />}
      {og_description && (
        <meta property="og:description" content={og_description} />
      )}
      {og_site_name && <meta property="og:site_name" content={og_site_name} />}
      {article_published_time && (
        <meta
          property="article:published_time"
          content={article_published_time}
        />
      )}
      {article_modified_time && (
        <meta
          property="article:modified_time"
          content={article_modified_time}
        />
      )}
      {article_section && (
        <meta property="article:section" content={article_section} />
      )}
      {article_tag && <meta property="article:tag" content={article_tag} />}
      {fb_admins && <meta property="fb:admins" content={fb_admins} />}
      {item_prop_image && <meta itemProp="image" content={item_prop_image} />}
      {twitter_image && <meta name="twitter:image" content={twitter_image} />}
      {og_image && <meta property="og:image" content={og_image} />}
    </Helmet>
  );
};

export default HeadSEO;
