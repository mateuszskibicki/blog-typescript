import { TextHelper, SmallTextHelper } from "prismic-helpers-sanitize";
import { ICodeSlice } from "../../../types/slices.types";

export const codeSlice = (data: any): ICodeSlice | null => {
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
    language: SmallTextHelper(sliceFixedData.language),
    code: TextHelper(sliceFixedData.code),
    margin_top: SmallTextHelper(sliceFixedData.margin_top),
    margin_bottom: SmallTextHelper(sliceFixedData.margin_bottom)
  };
};
