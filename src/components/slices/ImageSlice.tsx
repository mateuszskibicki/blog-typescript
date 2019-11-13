import React from "react";
//margin helper
import {
  marginTopHelper,
  marginBottomHelper
} from "../../helpers/slice-helpers/SliceMarginHelpers";
//types
import { IImageSlice } from "../../types/slices.types";

const ImageSlice: React.FC<{ content: IImageSlice }> = ({
  content
}: {
  content: IImageSlice;
}): JSX.Element | null => {
  if (!content) return null;

  const { image, margin_bottom, margin_top, width }: IImageSlice = content;

  if (!image || !image.url) return null;

  if (width === "full-width")
    return (
      <div
        className={`w-100 ${marginTopHelper(margin_top)} ${marginBottomHelper(
          margin_bottom
        )}`}
      >
        <img
          src={image.url}
          alt={image.alt ? image.alt : ""}
          className="w-100 shadow-sm"
        />
      </div>
    );

  return (
    <div
      className={`container ${marginTopHelper(margin_top)} ${marginBottomHelper(
        margin_bottom
      )}`}
    >
      <div className="row">
        <div className="col-12 text-center">
          <img
            src={image.url}
            alt={image.alt ? image.alt : ""}
            className="img-fluid rounded shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageSlice;
