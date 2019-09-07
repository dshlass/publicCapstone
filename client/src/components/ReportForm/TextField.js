import React from "react";
import Textarea from 'react-textarea-autosize';

class TextField extends React.Component {
  render() {
    const { input, type, reference } = this.props;
    return (
      <li className="input__input-field" ref={reference}>
        <Textarea className="input__text" required {...input} type={type} style={this.props.add} />
      </li>
    );
  }
}

export default TextField;
