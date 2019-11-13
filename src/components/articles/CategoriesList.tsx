import React from "react";
import { ButtonSmallOutlined } from "../common/buttons/ButtonSmallOutlined";

interface IProps {
  categories: string;
}

const CategoriesList: React.FC<IProps> = ({
  categories
}: IProps): JSX.Element | null => {
  if (!categories) return null;
  return (
    <div className="mb-1">
      <span className="mr-2 small text-secondary">Categories:</span>
      {categories.split(";").map(
        (singleCategory: string, index: number): JSX.Element | null => {
          if (!singleCategory || singleCategory.trim().length === 0)
            return null;
          return (
            <ButtonSmallOutlined
              key={index}
              text={singleCategory}
              internal
              url={`/articles?category=${singleCategory}`}
            />
          );
        }
      )}
    </div>
  );
};

export default CategoriesList;
