export const marginTopHelper = (
  marigin_top: string | number | null
): string => {
  if (!marigin_top) return "mt-0";
  let className = "mt-0";
  switch (String(marigin_top)) {
    case "0":
      className = "mt-0";
      break;
    case "1":
      className = "mt-1";
      break;
    case "2":
      className = "mt-2";
      break;
    case "3":
      className = "mt-3";
      break;
    case "4":
      className = "mt-4";
      break;
    case "5":
      className = "mt-5";
      break;
    default:
      className = "mt-0";
  }
  return className;
};

export const marginBottomHelper = (
  margin_bottom: string | number | null
): string => {
  if (!margin_bottom) return "mb-0";
  let className = "mb-0";
  switch (String(margin_bottom)) {
    case "0":
      className = "mb-0";
      break;
    case "1":
      className = "mb-1";
      break;
    case "2":
      className = "mb-2";
      break;
    case "3":
      className = "mb-3";
      break;
    case "4":
      className = "mb-4";
      break;
    case "5":
      className = "mb-5";
      break;
    default:
      className = "mb-0";
  }
  return className;
};
