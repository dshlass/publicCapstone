import React from "react";
import { Link } from "react-router-dom";

class Population extends React.Component {
  render() {
    const { linkTo, year, number } = this.props;

    return (
      <Link className="population" to={linkTo}>
        <p className="population__text--name population__project-name">{year}</p>
        <p className="population__text--additional">
          {number}
        </p>
      </Link>
    );
  }
}

export default Population;
