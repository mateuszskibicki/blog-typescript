import React from "react";
//@ts-ignore
import { RichText } from "prismic-reactjs";
//margin helper
import {
  marginTopHelper,
  marginBottomHelper
} from "../../helpers/slice-helpers/SliceMarginHelpers";
//types
import { ITextBlockSlice } from "../../types/slices.types";

const TextBlockSlice: React.FC<{ content: ITextBlockSlice }> = ({
  content
}: {
  content: ITextBlockSlice;
}): JSX.Element | null => {
  if (!content) return null;

  const {
    title,
    text_align,
    button_url,
    button_title,
    description,
    margin_bottom,
    margin_top
  }: ITextBlockSlice = content;

  return (
    <section
      className={`text-block-slice ${marginTopHelper(
        margin_top
      )} ${marginBottomHelper(margin_bottom)}`}
    >
      <div className={`container ${text_align && "text-" + text_align}`}>
        <div className="row">
          <div className="col-12 col-md-10 col-xl-9 mx-auto">
            {title && <h1>{title}</h1>}
            {description &&
              description.length > 0 &&
              RichText.render(description)}
            {button_url && button_title && (
              <a className="btn btn-main" href={button_url}>
                {button_title}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextBlockSlice;
