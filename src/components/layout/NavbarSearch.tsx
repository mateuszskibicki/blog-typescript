import React from "react";
import { connect } from "react-redux";
import {
  setSearchText,
  getArticlesBySearchText
} from "../../store/actions/search/searchActions";

const NavbarSearch: any = ({
  searchText,
  getArticlesBySearchText,
  setSearchText
}: any) => {
  const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchText(value);
    if (
      value &&
      value.trim().length > 0 &&
      value !== searchText &&
      getArticlesBySearchText
    ) {
      getArticlesBySearchText({ searchText: value });
    }
  };

  return (
    <div className="navbar__search d-flex flex-row align-items-center">
      <input
        type="text"
        className="shadow rounded"
        onChange={onChangeSearchText}
        value={searchText}
        placeholder={"Find..."}
      />
    </div>
  );
};

const mapStateToProps = ({ search }: any) => search;
const mapDispatchToProps = { setSearchText, getArticlesBySearchText };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarSearch);
