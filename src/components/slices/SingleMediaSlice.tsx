import React from "react";
//margin helper
import {
  marginTopHelper,
  marginBottomHelper
} from "../../helpers/slice-helpers/SliceMarginHelpers";
//types
import { ISingleMediaSlice } from "../../types/slices.types";

const SingleMediaSlice: React.FC<{ content: ISingleMediaSlice }> = ({
  content
}: {
  content: ISingleMediaSlice;
}): JSX.Element | null => {
  if (!content) return null;

  const {
    title,
    description,
    button_title,
    button_url,
    image,
    media_position,
    text_align,
    media_type,
    youtube,
    margin_bottom,
    margin_top
  }: ISingleMediaSlice = content;

  return (
    <section
      className={`single-media-slice ${marginTopHelper(
        margin_top
      )} ${marginBottomHelper(margin_bottom)}`}
    >
      <div className="container-fluid" style={{ maxWidth: "1300px" }}>
        <div className="row justify-content-center align-items-center">
          <div
            className={`col-12 col-md-6 mt-2 mb-2 ${media_position === "left" &&
              "order-12"} ${text_align && "text-" + text_align}`}
          >
            {title && <h3>{title}</h3>}
            {description && description.length > 0 && <p>{description}</p>}
            {button_url && button_title && (
              <a href={button_url}>{button_title}</a>
            )}
          </div>
          <div
            className={`col-12 col-md-6 mt-2 mb-2 ${media_position === "left" &&
              "order-1"}`}
          >
            {media_type === "image" && image && image.url && (
              <img
                src={image.url}
                alt={image.alt ? image.alt : ""}
                className="img-fluid shadow rounded"
              />
            )}
            {media_type === "youtube" && (
              <div
                className="youtube"
                dangerouslySetInnerHTML={{ __html: youtube.html }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleMediaSlice;
