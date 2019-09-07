import React from "react";
import { Field } from "redux-form";
import TextField from "./TextField";
import Add from "../../assets/Icons/SVG/addbutton.png";
import Remove from "../../assets/Icons/SVG/removebutton.png";

class SectionNotes extends React.Component {
  render() {
    const { fields } = this.props;
    return (
      <div>
        <div className="input__button-wrapper">
          <button
            type="button"
            className="input__button"
            onClick={() => fields.push()}
          >
            <img src={Add} alt="Add" className="input__add" />
          </button>
          <p>Add Contractor</p>
        </div>
        {fields.map((note, index) => (
          <div key={index}>
            <ul className="input__field-wrapper">
              <Field name={note} type="text" component={TextField} />
              <button
                type="button"
                title="Remove Contractor"
                onClick={() => fields.remove(index)}
                className="input__button-field"
              >
                <img src={Remove} alt="Remove" className="input__remove" />
              </button>
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default SectionNotes;
