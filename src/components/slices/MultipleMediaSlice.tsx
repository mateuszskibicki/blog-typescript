import React from "react";
//margin helper
import {
  marginTopHelper,
  marginBottomHelper
} from "../../helpers/slice-helpers/SliceMarginHelpers";
//types
import {
  IMultipleMediaSlice,
  IMultipleMediaSliceSingle
} from "../../types/slices.types";

const MultipleMediaSlice = ({
  content
}: {
  content: IMultipleMediaSlice;
}): JSX.Element | null => {
  if (!content) return null;

  const {
    title,
    button_title,
    button_url,
    media,
    margin_bottom,
    margin_top
  }: IMultipleMediaSlice = content;

  const mediaImage: React.FC<IMultipleMediaSliceSingle> = (
    singleMedia: IMultipleMediaSliceSingle,
    index: number
  ): JSX.Element | null => {
    if (!singleMedia.image) return null;

    return (
      <div className="col-12 col-sm-6 col-md-4 col-xl-4 " key={index}>
        <img
          src={singleMedia.image.url}
          alt={singleMedia.image.alt ? singleMedia.image.alt : ""}
          className="img-fluid shadow rounded"
        />
        <h3 className="mt-2 mb-2">{singleMedia.title}</h3>
        <p>{singleMedia.description}</p>
      </div>
    );
  };

  const mediaYoutube: React.FC<IMultipleMediaSliceSingle> = (
    singleMedia: IMultipleMediaSliceSingle,
    index: number
  ): JSX.Element | null => {
    if (!singleMedia.youtube || !singleMedia.youtube.html) return null;

    return (
      <div className="col-12 col-md-6 col-xl-4" key={index}>
        <div dangerouslySetInnerHTML={{ __html: singleMedia.youtube.html }} />
        <h3>{singleMedia.title}</h3>
        <p>{singleMedia.description}</p>
      </div>
    );
  };

  if (!media || media.length === 0) return null;

  return (
    <section
      className={`multiple-media-slice ${marginTopHelper(
        margin_top
      )} ${marginBottomHelper(margin_bottom)}`}
    >
      <div className="container">
        {title && (
          <h2 className="text-center my-2 multiple-media-slice__title">
            {title}
          </h2>
        )}
        <div className="row justify-content-center">
          {media.map((singleMedia, index) => {
            if (singleMedia.media_type === "image")
              return mediaImage(singleMedia, index);
            if (singleMedia.media_type === "youtube")
              return mediaYoutube(singleMedia, index);
            return "";
          })}
        </div>
        {button_url && button_title && (
          <div className="text-center">
            <a href={button_url}>{button_title}</a>
          </div>
        )}
      </div>
    </section>
  );
};

export default MultipleMediaSlice;
