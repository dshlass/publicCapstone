import React from "react";
import { Link } from "react-router-dom";

class AddButton extends React.Component {
  render() {
    const { link } = this.props;
    return (
      <Link className="creation" to={link}>
        <div className="creation__plus"></div>
      </Link>
    );
  }
}

export default AddButton;
