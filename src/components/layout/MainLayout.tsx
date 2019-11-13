import React from "react";
import { connect } from "react-redux";

import Navbar from "./Navbar";
import Footer from "./Footer";
import IconsFloating from "./IconsFloating";
import Loader from "./Loader";

interface IProps {
  loading: boolean;
  children: any;
}

const MainLayout = ({ loading, children }: IProps) => {
  return (
    <>
      <Navbar />
      <IconsFloating />
      {loading && <Loader />}
      {!loading && children && children}
      <Footer />
    </>
  );
};

MainLayout.defaultProps = {
  loading: false
};

const mapStateToProps = ({ loading }: { loading: boolean }) => loading;

export default connect(
  mapStateToProps,
  null
)(MainLayout);
