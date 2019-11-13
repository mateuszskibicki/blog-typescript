import React from "react";

interface IProps {
  searchText: string | null;
  category: string | null;
}

const CategorySearch = ({ searchText, category }: IProps) => {
  return (
    <div className="container mb-3">
      <div className="row">
        <div className="col-12">
          {searchText && (
            <h3>
              <strong>Results for: {searchText}</strong>
            </h3>
          )}
          {category && (
            <h3>
              <strong>Category: {category}</strong>
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySearch;
