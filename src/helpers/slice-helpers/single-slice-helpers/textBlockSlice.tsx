import {
  TextHelper,
  SmallTextHelper,
  UrlHelper,
  ArrayHelper
} from "prismic-helpers-sanitize";

import { ITextBlockSlice } from "../../../types/slices.types";

export const textBlockSlice = (data: any): ITextBlockSlice | null => {
  //If wrong type of data return null
  if (!data || !data.slice_type || !data.primary) return null;
  //Always take the slice_type and return it with data, helper will know what to display/render
  const dataType: string = data.slice_type;
  //Non repetable data inside slice
  const sliceFixedData: any = data.primary;
  //Repetable data (example: buttons)
  //const sliceRepetableData = data.items;

  //Data to send to the array of slices (always type and data if needed)
  return {
    type: dataType,
    title: TextHelper(sliceFixedData.title),
    text_align: SmallTextHelper(sliceFixedData.text_align),
    description: ArrayHelper(sliceFixedData.description),
    button_title: TextHelper(sliceFixedData.button_title),
    button_url: UrlHelper(sliceFixedData.button_url),
    margin_top: SmallTextHelper(sliceFixedData.margin_top),
    margin_bottom: SmallTextHelper(sliceFixedData.margin_bottom)
  };
};
