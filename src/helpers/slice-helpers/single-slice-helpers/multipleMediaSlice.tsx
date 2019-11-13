import {
  TextHelper,
  SmallTextHelper,
  UrlHelper,
  ImgHelper,
  EmbedHelper
} from "prismic-helpers-sanitize";

import {
  IMultipleMediaSliceSingle,
  IMultipleMediaSlice
} from "../../../types/slices.types";

export const multipleMediaSlice = (data: any): IMultipleMediaSlice | null => {
  //If wrong type of data return null
  if (!data || !data.slice_type || !data.primary) return null;
  //Always take the slice_type and return it with data, helper will know what to display/render
  const dataType: string = data.slice_type;
  //Non repetable data inside slice
  const sliceFixedData = data.primary;
  //Repetable data (example: buttons)
  const sliceRepetableData = data.items;

  //Data to send to the array of slices (always type and data if needed)
  return {
    type: dataType,
    title: TextHelper(sliceFixedData.title),
    button_title: TextHelper(sliceFixedData.button_title),
    button_url: UrlHelper(sliceFixedData.button_url),
    margin_top: SmallTextHelper(sliceFixedData.margin_top),
    margin_bottom: SmallTextHelper(sliceFixedData.margin_bottom),
    media: !(sliceRepetableData && sliceRepetableData.length > 0)
      ? null
      : sliceRepetableData.map(
          (element: any): IMultipleMediaSliceSingle | null => {
            if (!element) return null;
            return {
              title: TextHelper(element.title),
              description: TextHelper(element.description),
              image: ImgHelper(element.image),
              image_alternative: TextHelper(element.image_alternative),
              media_type: SmallTextHelper(element.media_type),
              youtube: EmbedHelper(element.youtube)
            };
          }
        )
  };
};
