import React from "react";
import { Link } from "react-router-dom";
import { ScrollToTop } from "../../../helpers/ScrollToTop";
interface IProps {
  text: string;
  url?: string;
  external?: boolean;
  internal?: boolean;
  className?: string;
}

export const ButtonSmallOutlined: React.FunctionComponent<IProps> = ({
  text,
  url,
  external,
  internal,
  className
}: IProps): JSX.Element | null => {
  if (!text) return null;

  if (!url)
    return (
      <button
        className={`btn btn-sm py-0 px-1 btn-outline-secondary rounded shadow-sm mr-2 ${className &&
          className}`}
      >
        {text}
      </button>
    );

  if (internal)
    return (
      <Link to={url} onClick={() => ScrollToTop()}>
        <button
          className={`btn btn-sm py-0 px-1 btn-outline-secondary rounded shadow-sm mr-2 ${className &&
            className}`}
        >
          {text}
        </button>
      </Link>
    );

  if (external)
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <button
          className={`btn btn-sm py-0 px-1 btn-outline-secondary rounded shadow-sm mr-2 ${className &&
            className}`}
        >
          {text}
        </button>
      </a>
    );

  return null;
};
