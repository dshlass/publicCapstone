import React from "react";
import Navigation from "../Navigation";

class Loader extends React.Component {
  render() {
    const { loaderTitle, match } = this.props;

    return (
      <>
        <Navigation title={loaderTitle} match={match} linkTo={`/`} />
      </>
    );
  }
}

export default Loader;
