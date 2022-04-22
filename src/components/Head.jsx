import React from "react";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

function Head({ type }) {
  return (
    <Helmet>
      <title>10up Blog {type ? ` - ${type}` : ""}</title>

      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="cleartype" content="on" />
    </Helmet>
  );
}

Head.propTypes = {
  type: PropTypes.string,
};

export default Head;
