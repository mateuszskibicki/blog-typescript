import React from "react";
import { ButtonSmallOutlined } from "../common/buttons/ButtonSmallOutlined";

const TagsList: React.FC<{ tags: string }> = ({
  tags
}: {
  tags: string;
}): JSX.Element | null => {
  if (!tags) return null;
  return (
    <div className="mb-1">
      <span className="mr-2 small text-secondary">Tags:</span>
      {tags.split(";").map(
        (singleTag: string, index: number): JSX.Element | null => {
          if (!singleTag || singleTag.trim().length === 0) return null;
          return <ButtonSmallOutlined key={index} text={singleTag} />;
        }
      )}
    </div>
  );
};

export default TagsList;
