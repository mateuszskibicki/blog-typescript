import React from "react";
import { ButtonSmallOutlined } from "../common/buttons/ButtonSmallOutlined";

interface IProps {
  series: string;
}

const SeriesList: React.FC<IProps> = ({
  series
}: IProps): JSX.Element | null => {
  if (!series) return null;
  return (
    <div className="mb-1">
      <span className="mr-2 small text-secondary">Series:</span>
      {series.split(";").map(
        (singleSeries: string, index: number): JSX.Element | null => {
          if (!singleSeries || singleSeries.trim().length === 0) return null;
          return <ButtonSmallOutlined key={index} text={singleSeries} />;
        }
      )}
    </div>
  );
};

export default SeriesList;
