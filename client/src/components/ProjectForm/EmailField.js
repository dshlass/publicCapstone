import React from "react";

class EmailField extends React.Component {
  render() {
    const { input, type } = this.props;
    return (
      <li className="input__input-field">
        <input className="input__text" required {...input} type={type} />
      </li>
    );
  }
}

export default EmailField;
